import {
  Entity,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Service } from './service.entity';
@Entity()
@Unique(['tk'])
export class Tenant extends BaseEntity {
  // 标识
  @Column()
  tk: string;

  // 描述
  @Column()
  name: string;

  @OneToMany(() => Service, (service) => service.tk)
  services: Service[];
}

