import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseFilters,
  Param,
  ParseIntPipe,
  HttpStatus,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { HttpException } from '@nestjs/common';
// 自定义管道
import { UserPipe } from '../../pipe/user.pipe';

@Controller('user')
// 类的异常捕获
// @UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(private readonly userSrvice: UserService) {}

  @Get()
  async root() {
    const res = await this.userSrvice.findAll();
    return res || [];
  }

  @Get('findOne')
  async findOne(
    @Query(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<any> {
    const res = await this.userSrvice.findOne({ id });
    if (!res) throw new HttpException('用户不存在', 401);
    return res;
  }

  // path参数
  @Get(':id')
  async findOne1(
    // 管道保护
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: // @Param('id')
    number,
  ) {
    console.log(id);
    const res = await this.userSrvice.findOne({ id });
    if (!res) throw new HttpException('用户不存在', 401);
    return res;
  }

  @Get('entity/:id')
  async findOne2(
    // 管道通过id查实体
    @Param('id')
    entity, // @Param('id')
  ) {
    return entity;
  }

  @Delete(':id')
  async delect(@Param('id') id) {
    const res = await this.userSrvice.deleteOne({ id });
    if (res) return '删除成功';
    throw new HttpException('该账号不存在', 201);
  }

  @Get('findAll')
  async findAll(): Promise<any> {
    const res = await this.userSrvice.findAll();
    return res || [];
  }

  @Post('admin')
  // 方法的异常捕获
  // @UseFilters(HttpExceptionFilter)
  async login(@Body() body): Promise<any> {
    const res = await this.userSrvice.findOne({ username: body.username });
    if (!res) throw new HttpException('用户不存在', 401);
    if (res.password !== body.password) {
      throw new HttpException('密码错误', 401);
    }
    return 'ok';
  }

  @Post('admin/register')
  async register(@Body() body): Promise<any> {
    const res = await this.userSrvice.register(body);
    if (res) return '注册成功';
    throw new HttpException('账号已经存在', 201);
  }
}
