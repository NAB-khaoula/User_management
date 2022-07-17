import { Controller, Get, Res, Req, UseGuards } from '@nestjs/common';
import { IntraAuthGuard } from './Guards/auth.guard';
import { IntraAuthService } from './services/IntraAuth.service';

@Controller('oauth')
export class IntraAuthController {
  constructor(private readonly intraAuthService: IntraAuthService) {}

  @Get()
  @UseGuards(IntraAuthGuard)
  async login(@Req() req, @Res() res) {
    return this.intraAuthService.intraLogin(req, res);
  }
}
