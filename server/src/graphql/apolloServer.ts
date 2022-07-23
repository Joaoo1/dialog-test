import { ApolloServer } from 'apollo-server-express';

import { typeDefs } from './typeDefs';
import { apolloConfig } from '../config/apollo';
import { resolvers } from '../resolvers';

const getApolloServer = () =>
  new ApolloServer({
    typeDefs,
    resolvers,
    ...apolloConfig,
  });

export { getApolloServer };
