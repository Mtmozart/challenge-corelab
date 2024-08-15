import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailDto } from './dto/loginDto';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SendEmailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly emailService: SendEmailService,
  ) {}

  async authenticate(data: EmailDto) {
    const user = await this.usersRepository.findOne({
      where: { username: data.username },
    });
    if (!user) {
      throw new BadRequestException('Credenciais inválidas');
    }

    const passwordMatches = await compare(data.password, user.password);
    if (!passwordMatches) {
      throw new ForbiddenException('Erro nas credenciais de acesso.');
    }

    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };
    const token = this.jwtService.sign(payload);
    return { token };
  }

  public async resetPassword(email: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: { email: email },
      });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      const newPassword = this.generateRandomCode(8);
      user.password = await hash(newPassword, 10);

      await this.usersRepository.save(user);

      await this.emailService.resetPasswordEmail(
        user.email,
        user.username,
        newPassword,
      );

      return { message: 'Senha redefinida com sucesso' };
    } catch (error) {
      throw error;
    }
  }

  private generateRandomCode(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}
