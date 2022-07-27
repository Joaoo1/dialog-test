import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { apolloConfig } from '../config/apollo';
import { UserResolver } from '../resolvers/user';

const getApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  });

  return new ApolloServer({
    schema,
    ...apolloConfig,
  });
};

export { getApolloServer };
