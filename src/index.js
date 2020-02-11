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
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext(() => ({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    }));
  },
});

const fakeAuth = {
  isAuthenticated: true,
  signIn(token) {
    localStorage.setItem('token', token);
    this.isAuthenticated = true;
  },
  getCredentials() {
    localStorage.getItem('token');
  },
  signOut() {
    localStorage.setItem('token');
    this.isAuthenticated = false;
  },
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/auth/index" />
      )
    }
  />
);

const App = () => {
  // const token = localStorage.getItem('token');
  // if (!token) {
  // }

  return (
    <BrowserRouter>
      <Switch>
        <ApolloProvider client={client}>
          <Route path="/admin" render={props => <AdminLayout {...props} />} />
          <Route path="/auth" render={props => <AuthLayout {...props} />} />
          <Route
            path="/auth/signin"
            render={props => {
              console.log(props);
              return <Redirect to="/admin/index" />;
            }}
          />
          {/* <Route exact path="/">
            <Redirect to="/auth/index" />
          </Route> */}
        </ApolloProvider>
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
