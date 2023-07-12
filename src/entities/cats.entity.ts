import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity()
export class Cats extends BaseEntity {
  @Column()
  name: string;
  @Column()
  age: string;
}
