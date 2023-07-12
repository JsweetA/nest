import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Tenant } from 'src/entities/tenant.entity';
import { Service } from 'src/entities/service.entity';
import { Role } from 'src/entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, Service, Role])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
