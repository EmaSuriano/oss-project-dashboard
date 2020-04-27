const percyHealthCheck = require('@percy/cypress/task');

module.exports = (on, config) => {
  on('task', percyHealthCheck);
  config.env.GITHUB_ACCESS_TOKEN_CI =
    process.env.REACT_APP_GITHUB_ACCESS_TOKEN_CI;
  return config;
};
