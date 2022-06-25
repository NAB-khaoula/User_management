import {
  Controller,
  Get,
  Query,
  Res,
  Req,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ok } from 'assert';
import { UsersService } from 'src/officialUsers/users.service';
import { IntraAuthGuard } from './Guards/auth.guard';
import { IntraAuthService } from './services/IntraAuth.service';

@Controller('oauth')
export class IntraAuthController {
  constructor(
    private readonly intraAuthService: IntraAuthService,
    private usersService: UsersService,
  ) {}

  /**
   * /api/ /home/login
   * this is the route for authentication
   */
  userData: any;
  accessToken;

  @Get()
  @HttpCode(200)
  @UseGuards(IntraAuthGuard)
  async login(@Req() req, @Res() res) {
    return this.intraAuthService.intraLogin(req, res);
  }

  /**
   * /api/ /home/status
   * retrieve the status auth
   */
}
