import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/request/createUserDto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.authenticationService.create(createUserDto);
  }

  @Get()
  async profile(): Promise<string> {
    return ' this.appService.getHello()';
  }

  @Put()
  async update(): Promise<string> {
    return ' this.appService.getHello()';
  }
  @Delete()
  async delete(): Promise<string> {
    return ' this.appService.getHello()';
  }
}
