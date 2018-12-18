require( 'babel-polyfill' );
require( '../utils/ignore' )();
require( 'babel-register' )( {
  presets: [ 'env', 'react', 'stage-0' ],
  plugins: [ 'react-loadable/babel', 'syntax-dynamic-import', 'dynamic-import-node' ]
} );
const Koa = require( 'koa' );
const path = require( 'path' );
const bodyParser = require('koa-bodyparser');
const staticCache = require( 'koa-static-cache' );
const Loadable = require( 'react-loadable' );

const rest = require( '../utils/restful/restifyCreator' );
const apiObservor = require( '../utils/restful/apiObservor' );
const createApp = require( '../utils/engines/render-engine-for-koa' ).default;

const app = new Koa();

app.use( staticCache( path.resolve( __dirname, '../../dist' ), {
  maxAge: 365 * 24 * 60 * 60,
  gzip: true
} ) );

app.use( bodyParser() );
app.use( rest.restify() );
app.use( apiObservor() );

app.use( createApp );

console.log( 'the server is running on 3000!' );

Loadable.preloadAll().then( () => { app.listen( 3000 ); } );

