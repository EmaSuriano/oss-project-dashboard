const auth = {
  isAuthenticated: false,
  signIn(token) {
    localStorage.setItem('token', token);
    this.isAuthenticated = true;
  },
  getCredentials() {
    return localStorage.getItem('token');
  },
  signOut() {
    localStorage.setItem('token');
    this.isAuthenticated = false;
  },
};

export default auth;
