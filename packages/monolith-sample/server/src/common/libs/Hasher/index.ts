import bcrypt from 'bcrypt';

import type { IHasher } from './IHasher';

export class Bcrypt implements IHasher {
  async hash(plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, 12);
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaintext, digest);
  }
}
