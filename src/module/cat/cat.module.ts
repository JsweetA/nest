import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { UserModule } from '../user/user.module';
import { UserService } from 'src/module/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cats } from 'src/entities/cats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cats])],
  controllers: [CatController],
  providers: [CatService],
  exports: [CatService],
})
export class CatModule {}
