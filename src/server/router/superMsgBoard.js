let express = require( 'express' );
let router = express.Router();

let superMsgBoard = new ( require( '../model/superMsgBoard' ) );

router.post( '/message', ( req, res ) => {
  let msgBoard = req.body;

  msgBoard.msg_pic = req.files.file.path.replace( /\\/g, "//");
  msgBoard.create_time = new Date().toLocaleString();

  superMsgBoard.saveMsg( msgBoard, ( callbackInfo ) => {
    res.end( JSON.stringify( callbackInfo ) );
  } );
} );

router.post( '/findMsgByLatAndLong', ( req, res ) => {
  superMsgBoard.findMsgByLatAndLong( req.body, ( msgs ) => {
    res.end( JSON.stringify( msgs ) );
  } );
} );

router.post( '/findMsgByUserInfo', ( req, res ) => {
  superMsgBoard.findMsgByUserInfo( req.body, ( msgs ) => {
    res.end( JSON.stringify( msgs ) );
  } );
} );

router.post( '/hasRel', ( req, res ) => {
  superMsgBoard.findMsgAndUserRel( req.body, ( callbackInfo ) => {
    res.end( JSON.stringify( callbackInfo ) );
  } );
} );

router.post( '/isEnjoyed', ( req, res ) => {
  let { isEnjoyed, ...rel } = req.body;

  if ( isEnjoyed ) {
    rel.create_time = new Date().toLocaleString();
    superMsgBoard.saveMsgAndUserRel( rel, ( callbackInfo ) => {
      res.end( JSON.stringify( callbackInfo ) );
    } );
  } else {
    superMsgBoard.delMsgAndUserRel( rel, ( callbackInfo ) => {
      res.end( JSON.stringify( callbackInfo ) );
    } );
  }
} );

router.post( '/findEnjoyedCount', ( req, res ) => {
  superMsgBoard.findEnjoyedCount( req.body, ( callbackInfo ) => {
    res.end( JSON.stringify( callbackInfo ) );
  } );
} );

module.exports = router;