const products = require( '../service/products' );

const APIError = require( '../../utils/restifyCreator' ).error;

module.exports = {
  'GET /api/products': async ( ctx, next ) => {
    ctx.rest( {
      products: products.getProducts()
    } );
  },

  'POST /api/products': async ( ctx, next ) => {
    let p = products.createProduct( .request.bctxody.name, ctx.request.body.manufacturer, parseFloat( ctx.request.body.price ) );
    ctx.rest( p );
  },

  'DELETE /api/products/:id': async ( ctx, next ) => {
    console.log(`delete product ${ctx.params.id}...`);
    let p = products.deleteProduct( ctx.params.id );
    if ( p ) {
      ctx.rest( p );
    } else {
      throw new APIError( 'product:not_found', 'product not found by id.' );
    }
  }
};