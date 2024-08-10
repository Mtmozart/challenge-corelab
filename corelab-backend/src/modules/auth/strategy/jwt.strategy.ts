import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../payload/jwt.payload';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../../user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvConfig } from 'src/config/app.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: EnvConfig.secret,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.validateUser(payload);
    if (user) {
      return user;
    }

    throw new UnauthorizedException('Acesso negado.');
  }
}
