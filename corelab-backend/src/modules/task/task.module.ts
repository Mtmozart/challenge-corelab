import { Module } from '@nestjs/common';
import { Task } from './entity/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { Address } from '../user/entities/address.entity';
import { JwtService } from '@nestjs/jwt';
import { SendEmailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User, Address]), SendEmailModule],
  controllers: [TaskController],
  providers: [TaskService, UserService, JwtService],
})
export class TaskModule {}
