let http = require( 'http' );
let application = require( './application' );
let response = require( './response' );
let request = require( './request' );
let context = require( './context' );

class Application {
  constructor() {
    this.context = context;
    this.request = request;
    this.response = response;
    this.middlewares = [];
  }

  use( middleware ) {
    this.middlewares.push( middleware );
  }

  compose() {
    return async ctx => {
      function createNext( middleware, oldNext ) {
        return async () => {
          await middleware( ctx, oldNext );
        }
      }

      let length = this.middlewares.length;
      let next = async () =>  Promise.resolve();

      for ( let i = length - 1; i >= 0; i-- ) {
        let currentMiddleware = this.middlewares[ i ];

        next = createNext( currentMiddleware, next );
      }
      await next();
    }
  }

  callback() {
    return ( req, res ) => {
      let ctx = this.createContext( req, res );
      let respond = () => this.createRespond( ctx );
      let fn = this.compose();

      return fn( ctx ).then( respond )
    }
  }

  createRespond( ctx ) {
    let content = ctx.body;

    if ( typeof  content === 'string' ) {
      ctx.res.end( content );
    } else {
      ctx.res.end( JSON.stringify( content ) );
    }
  }

  createContext( req, res ) {
    let ctx = Object.create( this.context );

    ctx.request = Object.create( this.request );
    ctx.response = Object.create( this.response );
    ctx.request.req = request.req = req;
    ctx.response.res = response.res = res;

    return ctx;
  }

  listen( ...args ) {
    let server = http.createServer( this.callback() );
    server.listen( ...args );
  }
}

module.exports = Application;