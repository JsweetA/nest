import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { UserService } from '../module/user/user.service';

@Injectable()
export class UserPipe implements PipeTransform {
  constructor(private readonly service: UserService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const id = value;

    const res = await this.service.findOne({ id });

    return res;
  }
}
