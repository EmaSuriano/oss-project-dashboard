import { withCors, queryParams } from './url';

const auth = {
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },
  signIn(token: string) {
    localStorage.setItem('token', token);
  },
  getCredentials() {
    return localStorage.getItem('token');
  },
  signOut() {
    localStorage.removeItem('token');
  },
};

const AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';
const ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';

const local = process.env.NODE_ENV !== 'production';

const CLIENT_ID = local
  ? process.env.REACT_APP_GITHUB_CLIENT_ID_LOCAL
  : process.env.REACT_APP_GITHUB_CLIENT_ID_PROD;

const CLIENT_SECRET = local
  ? process.env.REACT_APP_GITHUB_CLIENT_SECRET_LOCAL
  : process.env.REACT_APP_GITHUB_CLIENT_SECRET_PROD;

export const authLink = `${AUTHORIZE_URL}?${queryParams({
  client_id: CLIENT_ID,
  redirect_uri: `${window.location.origin}/login`,
  scope: 'user',
})}`;

export const buildAccessTokenLink = (code: string) =>
  withCors(
    `${ACCESS_TOKEN_URL}?${queryParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
    })}`,
  );

export default auth;
