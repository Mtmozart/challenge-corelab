import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from './dto/request/createUserDto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  async profile(@Param('id') id: string): Promise<User> {
    return await this.userService.profile(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Put()
  async update(): Promise<string> {
    return ' this.appService.getHello()';
  }
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Delete()
  async delete(): Promise<string> {
    return ' this.appService.getHello()';
  }
}
