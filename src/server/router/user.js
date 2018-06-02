let express = require( 'express' );
/*let jsonwebtoken = require( 'jsonwebtoken' );
let jwt = require( 'express-jwt' );*/
let authConfirm = require( '../utils/auth' );

let router = express.Router();

let User = require( '../model/user' );
let userDao = new User();

router.use( authConfirm );

router.get( '/find/all', ( req, res ) => {
  userDao.getUsers( ( users ) => {
    res.end( JSON.stringify( users ) );
  } );
} );

router.get( '/findByStatus', ( req, res ) => {
  userDao.getUserByStatus( req.body, ( users ) => {
    res.end( JSON.stringify( users ) );
  } );
} );

router.post( '/findByNameAndPasd', ( req, res ) => {
  userDao.getUserByNameAndPasd( req.body, ( users ) => {
    res.header( 'Access-Control-Expose-Headers', 'access-token' );
    res.header( 'access-token', Date.now() );
    res.end( JSON.stringify( { users } ) );
  } );
} );

router.post( '/add', ( req, res ) => {
  let user = req.body;

  user.create_time = new Date().toTimeString();
  user.update_time = user.create_time;

  userDao.addUser( user, ( user ) => {
    res.end( JSON.stringify( user ) );
  } );
} );

router.post( '/delete', ( req, res ) => {
  let user = req.body;
  let token = req.headers[ 'access-token' ];

  if ( !token ) {
    res.end( JSON.stringify( { users: [] } ) );
  }
  userDao.deleteUser( user, ( user ) => {
    res.end( JSON.stringify( user ) );
  } );
} );

module.exports = router;