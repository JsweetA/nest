import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { HttpException } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userSrvice: UserService) {}

  @Get()
  root(): string {
    return this.userSrvice.root();
  }

  @Get('findOne')
  async findOne(@Query() query: User): Promise<any> {
    const res = await this.userSrvice.findOne(query);
    if (!res) throw new HttpException('用户不存在', 401);
    return res;
  }

  @Get('findAll')
  async findAll(): Promise<any> {
    const res = await this.userSrvice.findAll();
    return res || [];
  }

  @Post('admin')
  async login(@Body() body: User): Promise<any> {
    const res = await this.userSrvice.findOne({username:body.username});
    if (!res) throw new HttpException('用户不存在', 401);
    if (res.password !== body.password) {
      throw new HttpException('密码错误', 401);
    }
    return '登录成功！';
  }

  @Post('admin/register')
  async register(@Body() body: User): Promise<any> {
    const res = await this.userSrvice.register(body);
    return res;
  }
}
