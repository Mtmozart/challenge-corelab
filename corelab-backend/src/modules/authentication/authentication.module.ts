import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { EnvConfig } from 'src/config/app.config';
import { SendEmailModule } from '../mail/mail.module';
import { SendEmailService } from '../mail/mail.service';
import { SendEmailProvider } from '../mail/mail.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Address]),
    JwtModule.register({
      secret: EnvConfig.secret,
      signOptions: { expiresIn: '1d' },
    }),
    SendEmailModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, SendEmailService, SendEmailProvider],
})
export class AuthenticationModule {}
