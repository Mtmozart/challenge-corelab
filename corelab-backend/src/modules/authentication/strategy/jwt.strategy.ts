import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { JwtPayload } from '../payload/jwt.payload';
import { AuthenticationService } from '../authentication.service';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authenticationService: AuthenticationService) {
    super();
  }

  async validate(payload: JwtPayload) {
    const user = await this.authenticationService.validateUser(payload);
    if (user) {
      return user;
    }

    throw new UnauthorizedException('Acesso negado.');
  }
}
