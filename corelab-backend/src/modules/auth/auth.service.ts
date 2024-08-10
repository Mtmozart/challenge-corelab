import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailDto } from './dto/loginDto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
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
}
