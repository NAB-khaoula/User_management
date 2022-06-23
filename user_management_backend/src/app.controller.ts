import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from '@nestjs/common';

@Controller('auth')
export class AppController {
  //   constructor() {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @Get('protected')
  testFn(): string {
    return 'this is a testing function';
  }
}
