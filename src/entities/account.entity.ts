import { Entity, Column, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Account extends BaseEntity {
  @Column()
  userName: string;

  @Column()
  nickName: string;

  @Column()
  realName: string;

  @Column()
  email: string;

  @Column()
  locked: boolean = false;
}
