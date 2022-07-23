import { Config, ExpressContext } from 'apollo-server-express';

export const apolloConfig: Config<ExpressContext> = {
  csrfPrevention: true,
  cache: 'bounded',
};
