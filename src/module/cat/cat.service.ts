import { Injectable } from '@nestjs/common';
import { Cats } from '../../entities/cats.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cats)
    private readonly useRepository: Repository<Cats>,
  ) {}

  async findOne(option) {
    const res = await this.useRepository.findOne({ where: option });
    return res;
  }

  async findAll() {
    const res = await this.useRepository.find();
    return res;
  }

  async save(option) {
    const res = await this.useRepository.save(option);
    return res;
  }
}
