import { Controller, Get } from '@nestjs/common';

@Controller()
export class AuthenticationController {
  constructor() {}

  @Get()
  getHello(): string {
    return ' this.appService.getHello()';
  }
}
