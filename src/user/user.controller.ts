import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { query } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userSrvice: UserService) {}

  @Get()
  root(): string {
    return this.userSrvice.root();
  }

  @Get('/findOne')
  async findOne(@Query() query: User): Promise<any> {
    console.log('query:', query);
    const res = await this.userSrvice.findOne(query);
    console.log('findResult:', res);
    return res;
  }

  @Post('/admin')
  async login(@Body() body: User): Promise<any> {
    const res = await this.userSrvice.login(body);
    console.log('body', body);
    console.log('find', res);
    return {
      code: '200',
      msg: 'success',
      data: res[0].password === body.password,
    };
  }

  @Post('/admin/register')
  async register(@Body() body: User): Promise<any> {
    const res = await this.userSrvice.register(body);
    return res;
  }
}
