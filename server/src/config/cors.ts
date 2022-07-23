import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  maxAge: 86400,
  origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
};
