import React from 'react';
import { Redirect } from 'react-router';
import auth from '../utils/auth';

const Logout = () => {
  auth.signOut();
  return <Redirect to="/login" />;
};

export default Logout;