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
    <Switch>
      <PrivateRoute path="/" exact component={Dashboard} />
      <Route path="/logout" exact component={Logout} />
      <Route path="/login" exact component={Login} />
      <Route path="/">
        <Redirect to="/" />
      </Route>
    </Switch>
  </Router>
);
