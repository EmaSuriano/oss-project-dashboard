const auth = {
  isAuthenticated: false,
  isFixedToken: false,
  signIn(token) {
    localStorage.setItem('token', token);
    this.isAuthenticated = true;
  },
  getCredentials() {
    if (process.env.REACT_APP_GITHUB_ACCESS_TOKEN) {
      this.isFixedToken = true;
      return process.env.REACT_APP_GITHUB_ACCESS_TOKEN;
    }

    return localStorage.getItem('token');
  },
  signOut() {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  },
};

const queryParams = params =>
  Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');

const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';
const ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const CLIENT_SECRET = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

export const authLink = `${AUTHORIZE_URL}?${queryParams({
  client_id: CLIENT_ID,
  redirect_uri: `${window.location.href}/auth`,
  scope: 'user',
})}`;

export const buildAccessTokenLink = code =>
  `https://cors-anywhere.herokuapp.com/${ACCESS_TOKEN_URL}?${queryParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code,
  })}`;

export default auth;
