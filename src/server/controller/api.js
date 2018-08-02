const users = [ '001', '002', '003', '004', '005' ];

module.exports = {
  'get /api/users': async( ctx, next ) => {
    ctx.rest( { users: users } );
  },
  'delete /api/:user': async( ctx, next ) => {
    ctx.rest( { user: users.indexOf( ctx.params.user ) } );
  }
};