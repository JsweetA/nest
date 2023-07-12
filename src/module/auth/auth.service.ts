import { Injectable } from '@nestjs/common';
import { Tenant } from '../../entities/tenant.entity';
import { Service } from 'src/entities/service.entity';
import { Role } from 'src/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Tenant)
    private readonly useTenant: Repository<Tenant>,
    @InjectRepository(Service)
    private readonly useService: Repository<Service>,
    @InjectRepository(Role)
    private readonly useRole: Repository<Role>,
  ) {}

  // 获取地区
  async getTenantList() {
    const res = await this.useTenant.find();
    return res;
  }

  // 增加地区
  async addTenant(e: Tenant) {
    const res = await this.useTenant.save(e);
    return res;
  }

  // 删除地区
  async deleteTenant(e) {
    const res = await this.useTenant.delete(e);
    return res;
  }

  // 服务
  async getServiceListBytenant(e) {
    // 如果是undefined或者 '' 就直接 返回全部
    const attr = e
      ? {
          where: { tk: { id: e } },
          relations: {
            tk: true,
          },
        }
      : {};
    const res = await this.useService.find(attr);
    return res;
  }

  async addService(e) {
    const res = await this.useService.save(e);
    return res;
  }

  async deleteService(e) {
    const res = await this.useService.delete(e);
    return res;
  }

  // 角色
  async getRoleList(e) {
    const res = await this.useRole.find({
      where: { svc: { id: e } },
      relations: {
        svc: true,
      },
    });
    return res;
  }

  async addRole(e) {
    const res = await this.useRole.save(e);
    return res;
  }

  async deleteRole(e) {
    const res = await this.useRole.delete(e);
    return res;
  }
  //
}
