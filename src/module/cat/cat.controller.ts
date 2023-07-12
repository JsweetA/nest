import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CatService } from './cat.service';

@Controller('cat')
export class CatController {
  constructor(private readonly service: CatService) {}
  @Get()
  async hello() {
    let res = await this.service.findAll();
    // return res;
    return res;
  }

  @Post()
  async create(@Body() body) {
    await this.service.save(body);
    return 'ok';
  }

  @Get(':id')
  async findById(@Param('id') entity) {
    return entity;
  }
}
