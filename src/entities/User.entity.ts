import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryColumn() // 自动生成id
    username: string

    @Column()
    password: string
}