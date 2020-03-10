import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import 'assets/vendor/nucleo/css/nucleo.css';
import 'assets/vendor/@fortawesome/fontawesome-free/css/all.min.css';
import 'assets/scss/argon-dashboard-react.scss';
import 'assets/custom.css';

import AdminLayout from 'layouts/Admin.jsx';
import AuthLayout from 'layouts/Auth.jsx';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import auth from './auth';

// add logic to always redirect to /auth in case I don't have the token inside the state of hte component.
// maybe the authProvider it's not needed
// Having all the state here will simplify things quite a lot

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: operation => {
    const token = auth.getCredentials();
    operation.setContext(() => ({
      headers: {
        authorization: token ? `token ${token}` : '',
      },
    }));
  },
});

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return auth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/auth" />
      );
    }}
  />
);

// make the login system following this tutorial --> https://tylermcginnis.com/react-router-protected-routes-authentication/

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Switch>
          <PrivateRoute path="/admin" component={AdminLayout} />
          <Route path="/auth" component={AuthLayout} />
          <Route>
            <Redirect to="/auth" />
          </Route>
        </Switch>
      </ApolloProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
