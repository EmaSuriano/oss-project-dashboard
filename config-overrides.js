/* config-overrides.js */
const AliasPlugin = require('enhanced-resolve/lib/AliasPlugin');
const path = require('path');
const ARGON_DASHBOARD_DIR = path.resolve(
  __dirname,
  'node_modules/argon-dashboard-react',
);

const PROJECT_DIR = __dirname;

const createAliases = folders =>
  folders.map(folder => ({
    name: folder,
    alias: [PROJECT_DIR, ARGON_DASHBOARD_DIR].map(
      dir => `${dir}/src/${folder}`,
    ),
  }));

module.exports = function override(config, env) {
  config.resolve.plugins = [
    new AliasPlugin(
      'described-resolve',
      createAliases(['assets', 'components', 'layouts', 'views', 'variables']),
      'resolve',
    ),
  ];

  config.module.rules = config.module.rules.concat([
    {
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      include: [ARGON_DASHBOARD_DIR],
      loader: require.resolve('babel-loader'),
      options: {
        presets: [require.resolve('babel-preset-react-app')],
      },
    },
  ]);

  return config;
};
