import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Service } from './service.entity';
@Entity()
export class Role extends BaseEntity {
  @Column()
  roleKey: string;
  @Column()
  name: string;

  createAt: number = new Date().getTime();

  @ManyToOne(() => Service, (service) => service.role)
  svc: Service;
}
