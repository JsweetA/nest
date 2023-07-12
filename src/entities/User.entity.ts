import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class User {
  @ApiProperty({
    type: Number,
    description: 'id',
  })
  @PrimaryGeneratedColumn() // 自动生成id
  id: number;

  @ApiProperty({
    type: String,
    description: '用户名',
  })
  @Column()
  username: string;

  @ApiProperty({
    type: String,
    description: '密码',
  })
  @Column()
  password: string;
}
