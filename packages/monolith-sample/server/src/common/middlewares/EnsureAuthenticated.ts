import type { NextFunction, Request, Response } from 'express';

import { db } from '../../database';
import { env } from '../../env';
import { AppError } from '../AppError';
import { HttpStatusCode } from '../HttpStatusCode';
import { Jwt } from '../libs/Jwt';

const jwt = new Jwt(env.JWT_SECRET);

class InvalidTokenError extends AppError {
  constructor() {
    super('Invalid token', HttpStatusCode.UNAUTHORIZED);
  }
}

class MissingTokenError extends AppError {
  constructor() {
    super('Missing required token', HttpStatusCode.UNAUTHORIZED);
  }
}

export const EnsureAuthenticated = async (
  request: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const token = request.headers.authorization?.split(' ').at(-1);

  if (!token) {
    throw new MissingTokenError();
  }

  const isNotJwtToken = !jwt.isValidFormat(token);

  if (isNotJwtToken) {
    throw new InvalidTokenError();
  }

  try {
    const { id } = jwt.decrypt(token);

    const user = await db
      .selectFrom('users')
      .where('id', '=', id)
      .select(['id'])
      .executeTakeFirst();

    if (!user) {
      throw new InvalidTokenError();
    }

    request.user = { id: user.id };

    return next();
  } catch (err) {
    throw new InvalidTokenError();
  }
};
