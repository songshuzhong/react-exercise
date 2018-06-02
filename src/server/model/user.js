let SqlCreator = require( '../db/sqlCreator' );

function User() {
  this.database = 'phachat';
  this.table = 'chat_user';
  this.primaryKey = 'userid';
}

User.prototype.getUsers = function( callback ) {
  SqlCreator.instance()
    .select( '*' )
    .from( this.table )
    .execute( this.database, callback );
};

User.prototype.getUserByStatus = function( params, callback ) {
  SqlCreator.instance()
    .select( '*' )
    .from( this.table )
    .where( 'status', '=', params.status )
    .execute( this.database, callback );
};

User.prototype.getUserByNameAndPasd = function( user, callback ) {
  SqlCreator.instance()
    .select( '*' )
    .from( this.table )
    .where( 'username', '=', user.username )
    .andWhere( 'password', '=', user.password )
    .execute( this.database, callback );
};

User.prototype.addUser = function( user, callback ) {
  SqlCreator.instance()
    .insert( 'chat_user' )
    .set( user )
    .values( user )
    .execute( this.database, callback );
};

User.prototype.deleteUser = function ( user, callback ) {
  SqlCreator.instance()
    .delete()
    .from( this.table )
    .where( 'userid', '=', user.userid )
    .execute( this.database, callback );
};

module.exports = User;