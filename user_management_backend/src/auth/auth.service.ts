import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(username: string): Promise<any> {
    const user = await this.usersService.getUserByUserName(username);
    if (user) {
      return user;
    }
    return null;
  }

  async signToken(userId: number, username: string): Promise<string> {
    const payload = {
      sub: userId,
      username,
    };
    return this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET,
    });
  }
}
