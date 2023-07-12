import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IsOptional } from 'class-validator';

export class BaseEntity {
  @PrimaryGeneratedColumn() // 自动生成id
  id: number;

  @IsOptional()
  @Column()
  remark?: string = '';
}
