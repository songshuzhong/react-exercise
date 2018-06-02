let SqlCreator = require( '../db/sqlCreator' );

function Message() {
  this.database = 'phachat';
  this.table = 'chat_message';
  this.primaryKey = 'messageid';
}

Message.prototype.getMessages = function( callback ) {
  SqlCreator.instance()
    .select( '*' )
    .from( this.table )
    .execute( this.database, callback );
};

Message.prototype.addMessage = function( message, callback ) {
  SqlCreator.instance()
    .insert( this.table )
    .set( message )
    .values( message )
    .execute( this.database, callback );
};

module.exports = Message;
