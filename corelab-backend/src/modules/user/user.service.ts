import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateUserClientDto } from './dto/request/createUserClientDto';
import { genSalt, hash } from 'bcrypt';
import { JwtPayload } from '../auth/payload/jwt.payload';
import { JwtService } from '@nestjs/jwt';
import { SendEmailQueueService } from '../mail/job/send-email-queue/sendEmailQueueService.service';
import { Request } from 'express';
import { getToken } from './utils/getToken';
import { UpdateUserDto } from './dto/request/updateUserDto';
import { CreateUserAdminDto } from './dto/request/createUserAdminDto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private readonly jwtService: JwtService,
    private readonly sendEmailQueueService: SendEmailQueueService,
  ) {}

  public async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: payload.sub },
    });
    if (!user || user.username !== payload.username) {
      throw new UnauthorizedException('Acesso negado');
    }

    return user;
  }

  public async create(
    createUserDto: CreateUserAdminDto | CreateUserClientDto,
  ): Promise<any> {
    try {
      const existingUser = await this.usersRepository.findOne({
        where: [
          { username: createUserDto.username },
          { email: createUserDto.email },
        ],
      });

      if (existingUser) {
        throw new ConflictException('E-mail ou username já cadastrado');
      }

      const user = new User();
      Object.assign(user, createUserDto);
      const salt = await genSalt();
      user.password = await hash(createUserDto.password, salt);

      const address = new Address();
      Object.assign(address, createUserDto.address);

      user.address = await this.addressRepository.save(address);

      user.roles = [];
      if (createUserDto.type == 'client') {
        user.roles.push('client');
      } else if (user.type == 'admin') {
        user.roles.push('admin');
      } else {
        throw new BadRequestException('Tipo de usuário inválido');
      }
      const userSaved = await this.usersRepository.save(user);
      const payload = {
        username: userSaved.username,
        sub: userSaved.id,
        roles: userSaved.roles,
      };
      const token = this.jwtService.sign(payload);

      await this.sendEmailQueueService.execute({
        name: userSaved.name,
        email: userSaved.email,
      });
      return { token };
    } catch (error) {
      throw error;
    }
  }

  public async profile(req: Request): Promise<User> {
    try {
      const token = getToken(req);
      const decoded = this.jwtService.verify(token);
      const user = await this.usersRepository.findOneOrFail({
        where: { id: decoded.sub },
      });
      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async update(
    req: Request,
    updates: Partial<UpdateUserDto>,
  ): Promise<User> {
    const user = await this.profile(req);

    if (updates.password) {
      const salt = await genSalt();
      updates.password = await hash(updates.password, salt);
    }

    if (updates.email && updates.email != user.email) {
      await this.findByEmailValidation(updates.email);
    }

    if (updates.username && updates.username != user.username) {
      await this.findByUsernameValidation(updates.username);
    }

    if (updates.address) {
      const updatedAddress = await this.addressRepository.save({
        ...user.address,
        ...updates.address,
      });
      updates.address = updatedAddress;
    }

    const updatedUser = await this.usersRepository.save({
      ...user,
      ...updates,
    });
    return updatedUser;
  }

  public async delete(req: Request) {
    try {
      const user = await this.profile(req);

      await this.usersRepository.remove(user);
      await this.addressRepository.remove(user.address);
    } catch (error) {
      throw error;
    }
  }

  private async findByEmailValidation(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });

    if (user) {
      throw new ConflictException('E-mail já cadastrado.');
    }
  }

  private async findByUsernameValidation(username: string) {
    const user = await this.usersRepository.findOne({
      where: { username: username },
    });

    if (user) {
      throw new ConflictException('Username já cadastrado.');
    }
  }
}
