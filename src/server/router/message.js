let express = require( 'express' );
let router = express.Router();

let MsgDao = require( '../model/message' );
let msgDao = new MsgDao();

router.get( '/get', ( req, res ) => {
  msgDao.getMessages( ( messages ) => {
    res.end( JSON.stringify( messages ) );
  } )
} );

module.exports = router;