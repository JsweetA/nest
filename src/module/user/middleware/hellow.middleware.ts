// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log(req.body, req.path, req.query);
//     next();
//   }
// }

export function LoggerMiddleware(req, res, next) {
  // console.log(`Module-middleware\n`);
  next();
}
