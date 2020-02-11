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

// add logic to always redirect to /auth in case I don't have the token inside hte state of hte component.
// maybe the authProvider it's not needed
// Having all the state here will simplify things quite a lot

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: operation =>
    operation.setContext(() => ({
      headers: {
        Authorization: `bearer ${process.env.REACT_APP_GH_TOKEN}`,
      },
    })),
});

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <ApolloProvider client={client}>
          <Route path="/admin" render={props => <AdminLayout {...props} />} />
          <Route path="/auth" render={props => <AuthLayout {...props} />} />
          <Route exact path="/">
            <Redirect to="/admin/index" />
          </Route>
        </ApolloProvider>
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
