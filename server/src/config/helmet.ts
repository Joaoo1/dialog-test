import { HelmetOptions } from 'helmet';

const isProduction = process.env.NODE_ENV === 'production';

export const helmetOptions: HelmetOptions = {
  // Disable this two options in development mode because Helmet is blocking apollo playground
  contentSecurityPolicy: isProduction ? undefined : false,
  crossOriginEmbedderPolicy: isProduction ? undefined : false,
};
