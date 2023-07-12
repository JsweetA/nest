import { HttpException } from '@nestjs/common';

export function logger(req, res, nest) {
  // console.log('Global-middleware\n');
  // throw new HttpException('请求错误', 229);
  // res.setHeader('Content-Type', 'application/json');
  // res.send('aaaaaa');
  // res.end();
  // 如果不给nest函数，就会处于挂起状态，不会执行
  nest();
}
