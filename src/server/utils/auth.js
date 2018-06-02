const expiresTime = 1000 * 60;

module.exports = function( req, res, next ) {
  const now = Date.now();
  let unauthorized = true;
  const token = req.headers[ 'access-token' ];

  if ( token ) {
    const expired = now - token > expiresTime;

    if ( !expired ) {
      unauthorized = false;
      res.header( 'Access-Control-Expose-Headers', 'access-token', now );
    }
  }

  if ( unauthorized ) {
    //res.redirect('/');
    next();
  } else {
    next();
  }
};