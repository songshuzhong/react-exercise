require( 'babel-polyfill' );
require( '../utils/ssrIgnore' )();
require( 'babel-register' )( {
  presets: [ 'env', 'react', 'stage-0' ],
  plugins: [ 'react-loadable/babel', 'syntax-dynamic-import', 'dynamic-import-node' ]
} );
const Koa = require( 'koa' );
const path = require( 'path' );
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const staticCache = require( 'koa-static-cache' );
const Loadable = require( 'react-loadable' );

const createApp = require( '../utils/engines/render-engine-for-koa' ).default;
const apiObservor = require( '../utils/apiObservor' );
const rest = require( '../utils/restifyCreator' );

const app = new Koa();

app.use( staticCache( path.resolve( __dirname, '../../dist' ), {
  maxAge: 365 * 24 * 60 * 60,
  gzip: true
} ) );

app.use( staticCache( path.resolve( __dirname, '../../static' ), {
  maxAge: 365 * 24 * 60 * 60,
  gzip: true
} ) );

app.use( cors() );
app.use( bodyParser() );
app.use( rest.restify() );
app.use( createApp );
app.use( apiObservor() );

console.log( 'the server is running on 3000!' );

Loadable.preloadAll().then( () => { app.listen( 3000 ); } );

