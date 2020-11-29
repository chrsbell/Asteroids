const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  return {
    entry: ['./client/src/components/App.jsx'],
    mode: argv.mode,
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[contenthash].js',
      sourceMapFilename: '[contenthash].js.map',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
        },
      ],
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        template: require('html-webpack-template'),
        appMountId: 'app',
        meta: [
          {
            name: 'description',
            content: 'Asteroids',
          },
          {
            name: 'author',
            content: 'Chris Bell',
          },
        ],
        lang: 'en-US',
        mobile: true,
        title: 'Asteroids',
        minify: argv.mode === 'production' ? true : false,
      }),
    ],
  };
};
