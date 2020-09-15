import { withCors, queryParams } from './url';

const AUTH_ID = 'auth_token';

const auth = {
  isFixedAuth() {
    return !!process.env.REACT_APP_GITHUB_ACCESS_TOKEN;
  },
  isAuthenticated() {
    return !!localStorage.getItem(AUTH_ID);
  },
  signIn(token: string) {
    localStorage.setItem(AUTH_ID, token);
  },
  getCredentials() {
    if (this.isFixedAuth()) {
      return process.env.REACT_APP_GITHUB_ACCESS_TOKEN;
    }

    return localStorage.getItem(AUTH_ID);
  },
  signOut() {
    localStorage.removeItem(AUTH_ID);
  },
};

const AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';
const ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';

const local = process.env.NODE_ENV !== 'production';

const CLIENT_ID = local
  ? process.env.REACT_APP_GITHUB_CLIENT_ID_LOCAL
  : process.env.REACT_APP_GITHUB_CLIENT_ID;

const CLIENT_SECRET = local
  ? process.env.REACT_APP_GITHUB_CLIENT_SECRET_LOCAL
  : process.env.REACT_APP_GITHUB_CLIENT_SECRET;

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
