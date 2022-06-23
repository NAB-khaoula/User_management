import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserByUserName(usrName: string): Promise<User> {
    try {
      const usrFound = await this.userRepository.findOneOrFail({
        userName: usrName,
      });
      return usrFound;
    } catch (error) {
      console.error(error);
    }
  }

  async addUser(userName: string) {
    const userCreated = new User();
    userCreated.userName = userName;
    const newUser = this.userRepository.create(userCreated);
    return this.userRepository.insert(newUser);
  }

  async updateUser(userName: string): Promise<User> {
    const updatedUser = await this.getUserByUserName(userName);
    updatedUser.userName = userName;
    return this.userRepository.save(updatedUser);
  }

  async removeUser(usrName: string) {
    const deletedUser = await this.getUserByUserName(usrName);
    return await this.userRepository.remove(deletedUser);
  }
}
