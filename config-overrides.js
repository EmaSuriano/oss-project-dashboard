/* config-overrides.js */

const path = require('path');

const ARGON_DASHBOARD_DIR = path.resolve(
  __dirname,
  'node_modules/argon-dashboard-react',
);

module.exports = function override(config, env) {
  //do stuff with the webpack config...

  config.resolve.alias = Object.assign(config.resolve.alias, {
    assets: `${ARGON_DASHBOARD_DIR}/src/assets`,
    components: `${ARGON_DASHBOARD_DIR}/src/components`,
  });

  return {
    ...config,
    module: {
      ...config.module,
      rules: config.module.rules.concat([
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          include: [ARGON_DASHBOARD_DIR],
          loader: require.resolve('babel-loader'),
          options: {
            presets: [require.resolve('babel-preset-react-app')],
          },
        },
      ]),
    },
  };
};
