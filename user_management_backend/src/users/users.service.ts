import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
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

  async getUserByUserName(username: string): Promise<User> {
    const userCreated = new User();
    userCreated.userName = username;
    const usrFound = await this.userRepository.findOne(userCreated);
    return usrFound;
  }

  async addUser(user: UserDto) {
    const userCreated = new User();
    userCreated.userName = user.user_name;
    userCreated.displayName = user.display_name;
    userCreated.avatarUrl = user.avatar_url;
    const newUser = this.userRepository.create(userCreated);
    return this.userRepository.insert(newUser);
  }

  // async updateUser(user: UserDto): Promise<User> {
  //   const updatedUser = await this.getUserByUserName(user.user_name);
  //   updatedUser.userName = userName;
  //   return this.userRepository.save(updatedUser);
  // }

  // async removeUser(usrName: string) {
  //   const deletedUser = await this.getUserByUserName(usrName);
  //   return await this.userRepository.remove(deletedUser);
  // }
}
