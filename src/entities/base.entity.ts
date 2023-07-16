import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn() // 自动生成id
  id: number;

  @Column()
  remark: string = '';
}
