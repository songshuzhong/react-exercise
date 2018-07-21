require( 'babel-polyfill' );
require( '../utils/ignore' )();
require( 'babel-register' )( {
  presets: [ 'env', 'es2015', 'react', 'stage-0' ],
  plugins: [ 'transform-decorators-legacy', 'react-loadable/babel', 'syntax-dynamic-import', 'dynamic-import-node' ]
} );
const Koa = require( 'koa' );
const path = require( 'path' );
const staticCache = require( 'koa-static-cache' );
const Loadable = require( 'react-loadable' );

const createApp = require( '../utils/engines/render-engine-for-koa' ).default;

const app = new Koa();

app.use( staticCache( path.resolve( __dirname, '../../dist' ), {
  maxAge: 365 * 24 * 60 * 60,
  gzip: true
} ) );

app.use( createApp );

console.log( 'the server is running on 3000!' );

Loadable.preloadAll().then( () => { app.listen( 3000 ); } );

