module.exports = {
  restify: ( prefix = '/api/' ) => {
    return async ( ctx, next ) => {
      if ( ctx.request.path.startsWith( prefix ) ) {
        ctx.rest = ( data ) => {
          ctx.response.type = 'application/json';
          ctx.response.body = data;
        };

        try {
          await next();
        } catch( e ) {
          ctx.response.status = 400;
          ctx.response.type = 'application/json';
          ctx.response.body = {
            code: e.code || 'internal: nuknow error!',
            message: e.message || ''
          };
        }
      } else {
        await next();
      }
    };
  },
  error: ( code, message ) => {
    this.code = code || 'internal: unknow error!';
    this.message = message || '';
  }
};