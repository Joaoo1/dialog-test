import { Request, Response } from 'express';
import { Options } from 'morgan';
import { createWriteStream } from 'fs';

export const morganOptions: Options<Request, Response> = {
  stream: createWriteStream('./requests.log', { flags: 'a' }),
};
