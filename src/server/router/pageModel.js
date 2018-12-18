module.exports = {
  'GET /api/pageModel/list': async( ctx ) => {
    ctx.rest( { code: 201, data: [ 1, 2, 3, 4, 5 ] } );
  }
};
