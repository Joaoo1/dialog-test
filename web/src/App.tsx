import { ApolloProvider } from '@apollo/client';

import { apolloClient } from './graphql/apolloClient';
import { Router } from './routes';
import GlobalStyles from './styles/global';

export const App = () => (
  <ApolloProvider client={apolloClient}>
    <Router />
    <GlobalStyles />
  </ApolloProvider>
);
