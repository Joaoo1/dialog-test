import type { RequestHandler } from 'express';
import { Jwt } from '../../../common/libs/Jwt';
import { db } from '../../../database';
import { env } from '../../../env';

const jwt = new Jwt(env.JWT_SECRET);

export const SetRequestUserIfAuthenticated: RequestHandler = async (
  request,
  _res,
  next
) => {
  try {
    const token = request.headers.authorization?.split(' ').at(-1);

    if (!token) {
      throw new Error();
    }

    const isNotJwtToken = !jwt.isValidFormat(token);

    if (isNotJwtToken) {
      throw new Error();
    }

    const { id } = jwt.decrypt(token);

    const user = await db
      .selectFrom('users')
      .where('id', '=', id)
      .select(['id'])
      .executeTakeFirst();

    if (!user) {
      throw new Error();
    }

    request.user = { id: user.id };
  } finally {
    next();
  }
};
