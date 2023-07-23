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
import { MqttController } from './module/mqtt/mqtt.controller';
import { MqttModule } from './module/mqtt/mqtt.module';

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
    MqttModule,

   
  ],
  controllers: [AppController, MqttController, ],
  providers: [AppService, ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
