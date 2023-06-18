import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter()); // 异常捕获
  app.useGlobalInterceptors(new TransformInterceptor()); // 响应拦截
  await app.listen(3000);
}
bootstrap();
