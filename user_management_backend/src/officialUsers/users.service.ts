import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from 'src/intra-auth/dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserByUserName(usr: UserDto): Promise<User> {
    const userCreated = new User();
    userCreated.userName = usr.user_name;
    userCreated.displayName = usr.display_name;
    userCreated.avatarUrl = usr.avatar_url;
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

  // async updateUser(userName: string): Promise<User> {
  //   const updatedUser = await this.getUserByUserName(userName);
  //   updatedUser.userName = userName;
  //   return this.userRepository.save(updatedUser);
  // }

  // async removeUser(usrName: string) {
  //   const deletedUser = await this.getUserByUserName(usrName);
  //   return await this.userRepository.remove(deletedUser);
  // }
}
