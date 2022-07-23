import { ApolloServer } from 'apollo-server-express';

import { typeDefs } from './typeDefs';
import { apolloConfig } from '../config/apollo';

const getApolloServer = () =>
  new ApolloServer({
    typeDefs,
    ...apolloConfig,
  });

export { getApolloServer };
