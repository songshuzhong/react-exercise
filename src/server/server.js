let fs = require( 'fs' );
let express = require( 'express' );
let multipart = require( 'connect-multiparty' );
let webpack = require( 'webpack' );
/*let winston = require('winston');
let expressWinston = require( 'express-winston' );*/
let bodyParser = require( 'body-parser' );
let webpackConfig = require( '../webpack.config' );
let webpackDevMiddleware = require( 'webpack-dev-middleware' );
let webpackHotMiddleware = require( 'webpack-hot-middleware' );
let env = process.env.NODE_ENV || 'dev';
let server = express();
let multipartMiddleware = multipart();

let app = server.listen( 3000, () => console.log( 'the server is running on 3000.') );

let socket = require( './socket/sio' );
socket( app );

if ( env === 'dev' ) {
  let compiler = webpack( webpackConfig );
  server.use( webpackDevMiddleware( compiler, { publicPath: webpackConfig.output.publicPath, noInfo: true, stats: { colors: true } } ) );
  server.use( webpackHotMiddleware( compiler ) );
}

/*server.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ]
}));*/

server.use( express.static( 'src/public', {
  dotfiles: 'ignore',
  etag: false,
  extensions: 'html',
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function( res, path, stat ) {
    res.set( 'x-timestamp', Date.now() );
  }
} ) );
server.use( bodyParser.json() );
server.use( bodyParser.urlencoded( { extended: true } ) );

let userRouter = require( './router/user' );
let messageRouter = require( './router/message' );
let superMsgBoard = require( './router/superMsgBoard' );

server.all( '*', ( req, res, next ) => { req.headers.accept?req.headers.accept.includes( 'html' )? res.render( 'index' ): next(): null } );
server.use( '/users', userRouter );
server.use( '/messages', messageRouter );
server.use( '/v1/msgBoard', multipartMiddleware, superMsgBoard );

server.set( 'views', './src/public/' );
server.set( 'view engine', 'html' );
server.engine( 'html', ( filePath, options, callback ) => {
  fs.readFile( filePath, ( err, content ) => {
    if ( err ) { throw new Error( err ) }
    return callback( null, content.toString() );
  } );
} );
