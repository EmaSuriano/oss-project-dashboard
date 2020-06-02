import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Box, Grid, Grommet } from 'grommet';
import { Sidebar } from './components';
import { theme } from './theme';
import { Dashboard } from './pages/Dashboard';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import auth from './auth';

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
});

export const App = () => (
  <Router>
    <ApolloProvider client={client}>
      <Grommet theme={theme} full>
        <Grid
          fill
          rows={['auto']}
          columns={['auto', 'flex']}
          areas={[
            { name: 'sidebar', start: [0, 0], end: [0, 0] },
            { name: 'main', start: [1, 0], end: [1, 0] },
          ]}
        >
          <Sidebar gridArea="sidebar" />
          <Box gridArea="main" overflow="auto" fill background="light-2">
            <Switch>
              <Route path="/" exact component={Dashboard} />
            </Switch>
          </Box>
        </Grid>
      </Grommet>
    </ApolloProvider>
  </Router>
);
