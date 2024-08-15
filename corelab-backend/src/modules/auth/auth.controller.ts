import { Body, Controller, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { EmailDto } from './dto/loginDto';
import { ResetPasswordDto } from './dto/resetDto';

@ApiTags('auth')
@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() data: EmailDto) {
    return await this.authService.authenticate(data);
  }
  @Put('reset-password')
  async resetPassword(@Body() data: ResetPasswordDto) {
    return this.authService.resetPassword(data.email);
  }
}
