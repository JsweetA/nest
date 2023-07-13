import { Entity, Column, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Service } from './service.entity';
@Entity()
@Unique(['key'])
export class Role extends BaseEntity {
  @Column()
  key: string;
  @Column()
  name: string;

  @Column()
  createAt: string = new Date().toString();

  @ManyToOne(() => Service, (service) => service.roles, { onDelete: 'CASCADE' })
  svc: Service;
}
