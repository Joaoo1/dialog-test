import { Express } from 'express';

import { getApolloServer } from './apolloServer';

export const initApolloServer = async (app: Express) => {
  const apolloServer = getApolloServer();

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });
};
