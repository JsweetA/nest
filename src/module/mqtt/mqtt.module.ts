import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brid } from 'src/entities/brid.entity';
import { MqttController } from './mqtt.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Brid])],
  providers: [MqttService],
  controllers: [MqttController],
})
export class MqttModule {}
