const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
          test: /\.(jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new HtmlWebpackPlugin({
          inject: true,
          template: HtmlWebpackTemplate,
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
          minify: true,
        }),
      ],
    },
    plugins: [new CleanWebpackPlugin()],
  };
};
