/*Mover el archivo en el common generico */

import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new InternalServerErrorException(
        'No existe el usuario en el (Request)',
      );
    }

    return !data ? user : user[data];
  },
);
