import path from 'path';
// import webpack from 'webpack';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
//merge config
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

//this solved:
//            Object literal may only specify known properties, and 'devServer' does not exist in type 'Configuration'
interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}
export const config: Configuration = {
  //The entry field tells Webpack where to start looking for modules to bundle. In our project, this is index.tsx.
  entry: './src/index.tsx',
  //The module field tells Webpack how different modules will be treated. Our project is telling Webpack to use the babel-loader plugin to process files with .js, .ts, and .tsx extensions.
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
    ],
  },
  //The resolve.extensions field tells Webpack what file types to look for in which order during module resolution.
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  //The output field tells Webpack where to bundle our code. In our project, this is the file called bundle.js in the build folder.
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  //The devServer field configures the Webpack development server. We are telling it that the root of the web server is the build folder, and to serve files on port 4000.
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 4000,
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin({
      //async: We have set this to false so that Webpack waits for the type checking process to finish before it emits any code.
      async: false,
      //eslint: We have set this to point to the source files so that Webpack informs us of any linting errors.
      eslint: {
        files: './src/**/*',
      },
    }),
  ],
};

export default config;
