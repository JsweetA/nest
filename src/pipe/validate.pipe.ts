import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(parseInt(value), value, metadata);
    // throw new HttpException('失效了哦', 403);

    return value;
  }
}
