import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class IntraAuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
    private jwt: JwtService,
  ) {}
  async signToken(userId: number, username: string): Promise<string> {
    const payload = {
      sub: userId,
      username,
    };
    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET,
    });
  }

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

      return res.status(HttpStatus.OK).json({
        jwt: await this.signToken(
          await this.usersService.getUserByUserName(req.user)['id'],
          req.user['user_name'],
        ),
      });
    }
  }
}
