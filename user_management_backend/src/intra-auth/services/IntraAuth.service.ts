import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class IntraAuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  async intraLogin(req, res) {
    if (!req.user) {
      return 'No user from intra';
    } else {
      const userExist = await this.usersService.getUserByUserName(
        req.user['user_name'],
      );
      if (!userExist) {
        await this.usersService.addUser(req.user);
      }
      return res
        .status(HttpStatus.OK)
        .json(await this.authService.login(req.user));
    }
  }
}
