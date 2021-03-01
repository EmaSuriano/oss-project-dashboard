import ApolloClient, { InMemoryCache } from 'apollo-boost';
import auth from '../utils/auth';

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

export default client;
