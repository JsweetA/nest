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

import { AuthModule } from './module/auth/auth.module';
import { AccountService } from './module/account/account.service';
import { AccountController } from './module/account/account.controller';
import { AccountModule } from './module/account/account.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'hyaaaa',
      password: '123456',
      database: 'sys',
      synchronize: true,
      entities: [__dirname + '/entities/*.js'],
    }),

    AuthModule,

    AccountModule,
  ],
  controllers: [AppController, AccountController],
  providers: [AppService, AccountService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
