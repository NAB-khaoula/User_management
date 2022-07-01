import { Strategy, verify } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Profile } from 'passport';
import { config } from 'dotenv';
import { UserDto } from '../../auth/dto/index';

config();

@Injectable()
export class fourtyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor() {
    super({
      clientID: process.env.INTRA_CLIENT_ID,
      clientSecret: process.env.INTRA_SECRET,
      callbackURL: process.env.INTRA_CALLBACK_URL,
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: verify,
  ): Promise<any> {
    const { id, username, photos, displayName } = profile;
    const user: UserDto = {
      user_name: username,
      display_name: displayName,
      avatar_url: photos[0].value,
    };
    // console.log(user);
    done(null, user);
    // console.log('done');
  }
}
