let SqlCreator = require( `../db/sqlCreator` );

function SuperMsgBoard() {
  this.database = `phachat`;
  this.table = `chat_msg_board`;
  this.rel = `chat_user_msg_rel`;
}

SuperMsgBoard.prototype.saveMsg = function( superMsgBoard, callback ) {
  SqlCreator.instance()
    .insert( this.table )
    .set( superMsgBoard )
    .values( superMsgBoard )
    .execute( this.database, callback );
};

SuperMsgBoard.prototype.findMsgByLatAndLong = function( rel, callback ) {
  SqlCreator.instance()
    .select( '*' )
    .from( this.table )
    .betweenWhere( 'latitude', rel.latitude - 500, rel.latitude + 500 )
    .reunite()
    .betweenWhere( 'unite.longitude', rel.longitude - 500, rel.longitude + 500 )
    .execute( this.database, callback );
};

SuperMsgBoard.prototype.findMsgByUserInfo = function( rel, callback ) {
  SqlCreator.instance()
    .select( '*' )
    .from( this.table )
    .where( 'user_id', '=', rel.user_id )
    .execute( this.database, callback );
};

SuperMsgBoard.prototype.delMsgAndUserRel = function( rel, callback ) {
  SqlCreator.instance()
    .delete()
    .from( this.rel )
    .where( 'user_id', '=', rel.user_id )
    .andWhere( 'msg_id', '=', rel.msg_id )
    .execute( this.database, callback );
};

SuperMsgBoard.prototype.saveMsgAndUserRel = function( rel, callback ) {
  SqlCreator.instance()
    .insert( this.rel )
    .set( rel )
    .values( rel )
    .execute( this.database, callback );
};

SuperMsgBoard.prototype.findMsgAndUserRel = function( rel, callback ) {
  SqlCreator.instance()
    .select( '*' )
    .from( this.rel )
    .where( 'user_id', '=', rel.user_id )
    .andWhere('msg_id', '=', rel.msg_id )
    .execute( this.database, callback );
};

SuperMsgBoard.prototype.findEnjoyedCount = function( rel, callback ) {
  SqlCreator.instance()
    .select( '*' )
    .from( this.rel )
    .where( 'msg_id', '=', rel.msg_id )
    .execute( this.database, callback );
};

module.exports = SuperMsgBoard;
