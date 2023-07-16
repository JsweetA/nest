import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Delete,
  Param,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Tenant } from 'src/entities/tenant.entity';
import { Service } from 'src/entities/service.entity';
import { Role } from 'src/entities/role.entity';
import { Account } from 'src/entities/account.entity';

@Controller('sys')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get('tenant')
  async tenantList() {
    const res = await this.service.getTenantList();
    return res;
  }

  @Post('tenant')
  async addTenant(@Body() body: Tenant) {
    const res = await this.service.addTenant(Object.assign(new Tenant(), body));
    return res;
  }

  // 服务
  @Get('service')
  async serviceList(@Query('tenant') tenant) {
    if (tenant === 'undefined' || tenant === '') tenant = null;
    const res = await this.service.getServiceListBytenant(tenant);
    return res.map((i) => {
      return {
        ...i,
        tk: i?.tk?.tk,
      };
    });
  }
  @Post('service')
  async addService(@Body() body) {
    const res = await this.service.addService(
      Object.assign(new Service({}), body),
    );
    return res;
  }
  @Delete('service/:svcId')
  async deleteService(@Param('svcId') id) {
    const res = await this.service.deleteService({ id });
    if (!res) throw new HttpException('删除失败', 500);
    return 'ok';
  }

  // 角色
  @Get('service/:svcId/role')
  async roleListBy(@Param('svcId') id) {
    const res = await this.service.getRoleList(id);
    return res.map((i) => {
      return {
        ...i,
        svc: i?.svc?.id,
      };
    });
  }

  @Post('service/:svcId/role')
  async addRole(@Param('svcId') id, @Body() body) {
    const res = await this.service.addRole(
      Object.assign(new Role(), { svc: id, ...body }),
    );
    return 'ok';
  }

  @Delete('service/:svcId/role/:roleId')
  async deleteRole(@Param() path) {
    const res = await this.service.deleteRole({ id: path.roleId });
    return 'ok';
  }

  // 账号
  @Get('acc')
  async accountListPage() {
    const res = await this.service.accountList();
    return {
      content: res,
    };
  }

  @Post('acc')
  async addAcount(@Body() body) {
    console.log(body);
    const res = await this.service.addAccount(
      Object.assign(new Account(), body),
    );
    return res;
  }
}
