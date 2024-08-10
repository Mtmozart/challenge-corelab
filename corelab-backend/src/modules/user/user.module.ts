import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';
import { JwtModule } from '@nestjs/jwt';
import { EnvConfig } from 'src/config/app.config';
import { SendEmailModule } from '../mail/mail.module';
import { SendEmailService } from '../mail/mail.service';
import { SendEmailProvider } from '../mail/mail.provider';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Address]),
    JwtModule.register({
      secret: EnvConfig.secret,
      signOptions: { expiresIn: '1d' },
    }),
    SendEmailModule,
  ],
  controllers: [UserController],
  providers: [UserService, SendEmailService, SendEmailProvider],
})
export class UserModule {}
