const express = require( 'express' );
const webpack = require( 'webpack' );
const webpackDevMiddleware = require( 'webpack-dev-middleware' );
const webpackHotMiddleware = require( 'webpack-hot-middleware' );
const webpackHotServerMiddleware = require( 'webpack-hot-server-middleware' );

const clientConfigDev = require( '../webpack/client.dev' );
const serverConfigDev = require( '../webpack/server.dev' );

const publicPath = clientConfigDev.output.publicPath;
const outputPath = clientConfigDev.output.path;
const DEV = process.env.NODE_ENV === 'development';

const app = express();

let isBuilt = false;

const done = () => !isBuilt && app.listen( 3000, () => {
  isBuilt = true;
  console.log('BUILD COMPLETE -- Listening @ http://localhost:3000'.magenta);
} );

if ( DEV ) {
  const compiler = webpack( [ clientConfigDev, serverConfigDev ] );
  const clientCompiler = compiler.compilers[ 0 ];
  const options = { publicPath, stats: { colors: true } };

  app.use( webpackDevMiddleware( compiler, options ) );
  app.use( webpackHotMiddleware( clientCompiler ) );
  app.use( webpackHotServerMiddleware( compiler ) );

  compiler.plugin( 'done', done );
}