import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(username: string): Promise<any> {
    const user = await this.usersService.getUserByUserName(username);
    if (user) return user;
    return null;
  }

  async login(user: UserDto) {
    const payload = {
      username: user.user_name,
      displayname: user.display_name,
      avatarUrl: user.avatar_url,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
