import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { CreateUserClientDto } from './dto/request/createUserClientDto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/request/updateUserDto';
import { CreateUserAdminDto } from './dto/request/createUserAdminDto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { TypeUser } from './enum/typeUserEnum';
import { DefaultUserClientDto } from './dto/response/DefaultUserDto';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserClientDto: CreateUserClientDto): Promise<any> {
    createUserClientDto.type = TypeUser.CLIENT;
    return this.userService.create(createUserClientDto);
  }

  @Post('create-admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('JWT-auth')
  async createAdmin(
    @Body() createUserAdmin: CreateUserAdminDto,
  ): Promise<DefaultUserClientDto> {
    createUserAdmin.type = TypeUser.ADMIN;
    return new DefaultUserClientDto(
      await this.userService.create(createUserAdmin),
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get()
  async profile(@Req() request: Request): Promise<DefaultUserClientDto> {
    return new DefaultUserClientDto(await this.userService.profile(request));
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Put()
  async update(
    @Req() req: Request,
    @Body() update: UpdateUserDto,
  ): Promise<DefaultUserClientDto> {
    return new DefaultUserClientDto(await this.userService.update(req, update));
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Delete()
  async delete(@Req() request: Request): Promise<void> {
    return await this.userService.delete(request);
  }
}
