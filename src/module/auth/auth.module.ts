import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Tenant } from 'src/entities/tenant.entity';
import { Service } from 'src/entities/service.entity';
import { Role } from 'src/entities/role.entity';
import { Account } from 'src/entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, Service, Role, Account])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
