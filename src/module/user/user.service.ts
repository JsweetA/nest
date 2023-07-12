import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  root(): string {
    return 'userService';
  }

  async findOne(option) {
    console.log(option, 'service');

    const res = await this.userRepository.findOne({ where: option });
    return res;
  }

  async findAll() {
    const res = await this.userRepository.find();
    return res;
  }

  async deleteOne(option) {
    const t = await this.userRepository.findOne({
      where: option,
    });
    if (t) {
      const res = await this.userRepository.delete(option);
      return res;
    }
    return null;
  }

  async register(option) {
    const t = await this.userRepository.findOne({
      where: { username: option.username },
    });
    if (!t) {
      const res = await this.userRepository.save(option);
      return res;
    }
    return null;
  }
}
