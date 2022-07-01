import { Controller, Get, Res, Req, UseGuards, HttpCode } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { IntraAuthGuard } from './Guards/auth.guard';
import { IntraAuthService } from './services/IntraAuth.service';

@Controller('oauth')
export class IntraAuthController {
  constructor(
    private readonly intraAuthService: IntraAuthService,
    private usersService: UsersService,
  ) {}

  @Get()
  @HttpCode(200)
  @UseGuards(IntraAuthGuard)
  async login(@Req() req, @Res() res) {
    return this.intraAuthService.intraLogin(req, res);
  }
}
