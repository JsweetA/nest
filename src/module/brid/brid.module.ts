import { Module } from '@nestjs/common';
import { BridService } from './brid.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brid } from 'src/entities/brid.entity';
import { BridController } from './brid.controller';

// import {
//   ClientsModule,
//   Transport,
//   ClientProxyFactory,
// } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Brid]),
    // ClientsModule.register([
    //   {
    //     name: 'MATH_SERVICE',
    //     transport: Transport.MQTT,
    //     options: {
    //       url: 'mqtt://182.92.162.42:1883',
    //     },
    //   },
    // ]),
  ],
  providers: [BridService],
  controllers: [BridController],
})
export class BridModule {}
