import { Redirect } from 'react-router';
import auth from '../helpers/auth';

export const Logout = () => {
  auth.signOut();
  return <Redirect to="/login" />;
};
