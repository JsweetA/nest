import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Tenant } from './tenant.entity';
import { Role } from './role.entity';

@Entity()
export class Service extends BaseEntity {
  @Column()
  svcKey: string;
  @Column()
  name: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.services)
  tk: Tenant;

  @OneToMany(() => Role, (role) => role.svc)
  role: Role[];
}
