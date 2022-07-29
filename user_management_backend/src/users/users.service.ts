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
    userCreated.userName = user.userName;
    userCreated.avatarUrl = user.avatarUrl;
    userCreated.removedAvatar = user.removedAvatar || false;
    userCreated.twoFactorAuth = user.twoFactorAuth || false;
    const newUser = this.userRepository.create(userCreated);
    return this.userRepository.insert(newUser);
  }

  async updateUsername(login: string, username: string): Promise<User> {
    const updatedUser = await this.getUserBylogin(login);
    if (username) updatedUser.userName = username;
    return this.userRepository.save(updatedUser);
  }

  async updateAvatarUrl(login: string, avatar: string): Promise<User> {
    const updatedUser = await this.getUserBylogin(login);
    if (avatar) updatedUser.avatarUrl = avatar;
    return this.userRepository.save(updatedUser);
  }

  // async removeUser(usrName: string) {
  //   const deletedUser = await this.getUserByUserName(usrName);
  //   return await this.userRepository.remove(deletedUser);
  // }
}
