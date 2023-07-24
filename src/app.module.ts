import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { logger } from './middleware/logger.middleware';

import { BridModule } from './module/brid/brid.module';
import {
  ClientsModule,
  Transport,
  ClientProxyFactory,
} from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'hyaaaa',
      password: '123456',
      database: 'mqtt',
      synchronize: true,
      entities: [__dirname + '/entities/*.js'],
    }),

    BridModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: 'API_v1',
    //   useFactory: () =>
    //     ClientProxyFactory.create({
    //       transport: Transport.MQTT,
    //       options: {
    //         url: 'mqtt://182.92.162.42:1883',
    //         userProperties: { 'x-version': '1.0.0' },
    //       },
    //     }),
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
