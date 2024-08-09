import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/request/createUserDto';
import { genSalt, hash } from 'bcrypt';
import { JwtPayload } from './payload/jwt.payload';
import { JwtService } from '@nestjs/jwt';
import { SendEmailQueueService } from '../mail/job/send-email-queue/sendEmailQueueService.service';

@Injectable()
export class AuthenticationService {
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

  public async create(createUserDto: CreateUserDto): Promise<any> {
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
      if (user.type == 'admin') {
        user.roles.push('admin');
      } else if (user.type == 'client') {
        user.roles.push('client');
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

  public async profile() {}

  public async update() {}

  public async delete() {}
}
