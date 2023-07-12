import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Tenant } from 'src/entities/tenant.entity';
import { Service } from 'src/entities/service.entity';
import { Role } from 'src/entities/role.entity';

@Controller('sys')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get('tenant')
  async tenantList() {
    const res = this.service.getTenantList();
    return res;
  }

  @Post('tenant')
  async addTenant(@Body() body: Tenant) {
    const res = this.service.addTenant(Object.assign(new Tenant(), body));
    return res;
  }

  // 服务
  @Get('service')
  async serviceList(@Query('tenant') tenant) {
    if (tenant === 'undefined' || tenant === '') tenant = null;
    const res = this.service.getServiceListBytenant(tenant);
    return res;
  }
  @Post('service')
  async addService(@Body() body) {
    const res = this.service.addService(Object.assign(new Service(), body));
    return res;
  }
  @Delete('service/:svcId')
  async deleteService(@Param('svcId') id) {
    const res = this.service.deleteService({ id });
    return 'ok';
  }

  // 角色
  @Get('service/:svcId/role')
  async roleListBy(@Param('svcId') id) {
    const res = this.service.getRoleList(id);
    return res;
  }

  @Post('service/:svcId/role')
  async addRole(@Param('svcId') id, @Body() body) {
    const res = this.service.addRole(
      Object.assign(new Role(), { svc: id, ...body }),
    );
    return 'ok';
  }
}
