import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './middleware/http-exception.filter';
import { TransformInterceptor } from './middleware/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter()); // 异常过滤器
  app.useGlobalInterceptors(new TransformInterceptor()); // 响应拦截
  await app.listen(3000);
}
bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './middleware/http-exception.filter';
// import { TransformInterceptor } from './middleware/transform.interceptor';
// import { Transport, MicroserviceOptions } from '@nestjs/microservices';

// async function bootstrap() {
//   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
//     AppModule,
//     {
//       transport: Transport.MQTT,
//       options: {
//         // host: '127.0.0.1',
//         // port: '3001',
//         url: 'mqtt://182.92.162.42:1883',
//       },
//     },
//   );
//   // app.enableCors();
//   app.useGlobalFilters(new HttpExceptionFilter()); // 异常过滤器
//   app.useGlobalInterceptors(new TransformInterceptor()); // 响应拦截
//   await app.listen();
// }
// bootstrap();
