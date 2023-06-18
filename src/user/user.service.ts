import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
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

  async login(option: object) {
    let res = await this.userRepository.find(option);
    return res;
  }

  async register(option: object) {
    await this.userRepository.save(option);
    return 'ok';
  }

  async findOne(option: object) {
    const res = await this.userRepository.findOne({where:option});
    // const res = await this.userRepository.query(`SELECT * FROM USER WHERE username=${option.username}`);
    return res;
  };
}
