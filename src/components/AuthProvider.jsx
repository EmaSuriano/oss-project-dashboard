import React from 'react'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: operation =>
    operation.setContext(() => ({
      headers: {
        Authorization: `bearer ${process.env.REACT_APP_GH_TOKEN}`,
      },
    })),
});

const AuthProvider = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}

export default AuthProvider
