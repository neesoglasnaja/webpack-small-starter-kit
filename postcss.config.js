const webpack = require('webpack');

module.exports = {
  plugins: {
    'postcss-smart-import': {
      addDependencyTo: webpack,
    },
    'postcss-url': {
      url: 'rebase',
    },
    'postcss-preset-env': {
      stage: 3,
    },
    autoprefixer: {},
  },
};
