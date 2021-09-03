import { FunctionComponent } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from 'react-router-dom';
import auth from './helpers/auth';
import { Login } from './pages/Login';
import { Logout } from './pages/Logout';
import { Dashboard } from './pages/Dashboard';

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
    <Dashboard />
    {/* <Switch>
      <PrivateRoute path="/" component={Dashboard} />
      <Route path="/logout" component={Logout} />
      <Route path="/login" component={Login} />
    </Switch> */}
  </Router>
);
