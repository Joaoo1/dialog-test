import { CorsOptions } from 'cors';

const isDevelopment = process.env.NODE_ENV === 'development';

export const corsOptions: CorsOptions = {
  maxAge: 86400,
  origin: isDevelopment ? '*' : [''],
};
