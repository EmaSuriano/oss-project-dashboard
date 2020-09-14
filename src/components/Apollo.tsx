import React, { ReactNode } from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import auth from '../utils/auth';

import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: (operation) => {
    const token = auth.getCredentials();
    operation.setContext(() => ({
      headers: {
        authorization: token ? `token ${token}` : '',
      },
    }));
  },
  cache: new InMemoryCache(),
});

type Props = {
  children: ReactNode;
};

const Apollo = ({ children }: Props) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default Apollo;
