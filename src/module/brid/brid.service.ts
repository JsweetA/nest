import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brid } from 'src/entities/brid.entity';

@Injectable()
export class BridService {
  constructor(
    @InjectRepository(Brid)
    private readonly useBrid: Repository<Brid>,
  ) {}

  async saveRecord(data) {
    const res = await this.useBrid.save(data);
    return res;
  }

  async recordList() {
    const res = await this.useBrid.find();
    return res;
  }
}
