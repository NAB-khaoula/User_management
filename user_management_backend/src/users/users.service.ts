import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from 'src/auth/dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserBylogin(login: string): Promise<User> {
    const userCreated = new User();
    userCreated.login = login;
    const usrFound = await this.userRepository.findOne(userCreated);
    return usrFound;
  }

  async addUser(user: UserDto) {
    const userCreated = new User();
    userCreated.login = user.login;
    userCreated.email = user.email;
    userCreated.username = user.userName;
    userCreated.avatar = user.avatar;
    userCreated.changedAvatar = false;
    userCreated.isTwoFactorAuthEnabled = false;
    userCreated.isTwoFactorAuthenticated = false;
    userCreated.twoFactorAuthenticationSecret = '';
    const newUser = this.userRepository.create(userCreated);
    return this.userRepository.insert(newUser);
  }

  async updateUsername(login: string, username: string): Promise<User> {
    const updatedUser = await this.getUserBylogin(login);
    if (username) updatedUser.username = username;
    return this.userRepository.save(updatedUser);
  }

  async updateAvatarUrl(updatedUser: User, avatar: string): Promise<User> {
    if (avatar) {
      updatedUser.avatar = avatar;
      updatedUser.changedAvatar = true;
    }
    return this.userRepository.save(updatedUser);
  }

  async EnableDisable2FA(login: string): Promise<User> {
    const user = await this.getUserBylogin(login);
    if (user) {
      user.isTwoFactorAuthEnabled = !user.isTwoFactorAuthEnabled;
    }
    return this.userRepository.save(user);
  }

  async setTwoFactorAuthenticationSecret(secret: string, login: string) {
    const user = await this.getUserBylogin(login);
    user.twoFactorAuthenticationSecret = secret;
  }

  async turnOnTwoFactorAuthentication(login: string) {
    const user = await this.getUserBylogin(login);
    user.isTwoFactorAuthenticated = true;
  }

  async unSet2FASecret(login: string) {
    const user = await this.getUserBylogin(login);
    user.twoFactorAuthenticationSecret = null;
    user.isTwoFactorAuthenticated = false;
    return this.userRepository.save(user);
  }
}
