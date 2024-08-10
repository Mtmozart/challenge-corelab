import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { EmailDto } from './dto/loginDto';

@ApiTags('auth')
@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() data: EmailDto) {
    return await this.authService.authenticate(data);
  }
}
