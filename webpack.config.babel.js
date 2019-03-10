import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';

const NODE_ENV = process.env.NODE_ENV || 'production';

const config = {
  mode: NODE_ENV,
  entry: {
    common: path.resolve('src/common.js'),
  },
  output: {
    path: path.resolve('dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    library: '[name]',
  },
  devtool: NODE_ENV === 'development' ? 'source-map' : false,
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
  context: path.resolve(),
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
    new StyleLintPlugin({
      files: ['./src/**/*.css'],
      failOnError: false,
    }),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
          configFile: '.eslintrc',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: NODE_ENV === 'development',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: NODE_ENV === 'development',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
};

export default config;
