import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/officialUsers/users.service';

@Injectable()
export class IntraAuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
    private jwt: JwtService,
  ) {}
  async getAccessToken(query: any): Promise<any> {
    return firstValueFrom(
      this.httpService.post('https://api.intra.42.fr/oauth/token', {
        grant_type: 'authorization_code',
        client_id: process.env.INTRA_CLIENT_ID,
        client_secret: process.env.INTRA_SECRET,
        code: query.code,
        redirect_uri: process.env.INTRA_CALLBACK_URL,
      }),
    );
  }
  async getUserData(authCode: string): Promise<any> {
    return firstValueFrom(
      this.httpService.get('https://api.intra.42.fr/v2/me', {
        headers: {
          Authorization: `bearer ${authCode}`,
        },
      }),
    );
  }

  // async signToken(userId: number, email: string): Promise<string> {
  //   const payload = {
  //     sub: userId,
  //     email,
  //   };
  //   return this.jwt.signAsync(payload, {
  //     expiresIn: '15m',
  //     secret: process.env.JWT_SECRET,
  //   });
  // }

  async intraLogin(req, res) {
    if (!req.user) {
      return 'No user from intra';
    } else {
      if (!this.usersService.getUserByUserName(req.user['user_name']))
        await this.usersService.addUser(req.user['user_name']);
      return res.status(HttpStatus.OK).json({
        message: 'User information from intra',
        user: req.user,
      });
    }
  }
}
