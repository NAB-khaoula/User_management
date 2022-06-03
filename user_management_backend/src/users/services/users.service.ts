import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from '../users.entity';

@Injectable()
export class usersService {
  constructor(
    @InjectRepository(user) private userRepository: Repository<user>,
  ) {}

  getAll(): Promise<user[]> {
    return this.userRepository.find();
  }

  getUserById(id: number) {
    try {
      const newUser = this.userRepository.findOneOrFail(id);
    } catch {}
    return this.userRepository.findOneOrFail(id);
  }
}
