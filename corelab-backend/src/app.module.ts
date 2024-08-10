import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dataSourceConfig } from './database/dataSource';
import { TaskModule } from './modules/task/task.module';
import { SendEmailModule } from './modules/mail/mail.module';
import { redisConfig } from './database/redisSource';
import { BullModule } from '@nestjs/bull';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: redisConfig(),
    }),
    TypeOrmModule.forRoot(dataSourceConfig() as TypeOrmModuleOptions),
    UserModule,
    TaskModule,
    AuthModule,
    SendEmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
