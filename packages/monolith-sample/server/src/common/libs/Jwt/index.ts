import jwt from 'jsonwebtoken';

import type { IJwt, JwtPayload } from './IJwt';

export class Jwt implements IJwt {
  constructor(private readonly secret: string) {}

  encrypt(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret as jwt.Secret, { expiresIn: '7d' });
  }

  decrypt(token: string): JwtPayload {
    return jwt.verify(token, this.secret) as JwtPayload;
  }

  isValidFormat(token: string): boolean {
    return Boolean(jwt.decode(token));
  }
}
