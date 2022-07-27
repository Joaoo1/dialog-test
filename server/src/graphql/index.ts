import { Express } from 'express';

import { getApolloServer } from './apolloServer';

export const initApolloServer = async (app: Express) => {
  const apolloServer = await getApolloServer();

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });
};
