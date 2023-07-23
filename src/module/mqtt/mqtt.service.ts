import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brid } from 'src/entities/brid.entity';
@Injectable()
export class MqttService {
  constructor(
    @InjectRepository(Brid)
    private readonly useTenant: Repository<Brid>,
  ) {}
}
