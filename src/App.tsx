import React, { FunctionComponent } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from 'react-router-dom';
import { Box, Grid, Grommet } from 'grommet';
import { Sidebar } from './components';
import { theme } from './theme';
import { Dashboard } from './pages/Dashboard';
import Settings from './pages/Settings';
import Apollo from './components/Apollo';
import auth from './utils/auth';
import Login from './pages/Login';
import Logout from './pages/Logout';
import { SimpleDashboard } from './pages/SimpleDashboard';

const PrivateRoute = ({
  component: Component,
  ...rest
}: RouteProps & { component: FunctionComponent }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export const App = () => (
  <Router>
    <Apollo>
      {/* <Grommet theme={theme} full> */}
      <Switch>
        <PrivateRoute path="/" exact component={Dashboard} />
        <PrivateRoute path="/settings" exact component={Settings} />
        <PrivateRoute path="/new" exact component={SimpleDashboard} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/login" exact component={Login} />
        <Route path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
      {/* </Grommet> */}
    </Apollo>
  </Router>
);
