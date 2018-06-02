let mysql = require( 'mysql' );
let config = require( 'config' );

function DbConfig( database ) {
  this.config = config.get( 'mysql.' + database );
}

DbConfig.prototype.execute = function( sql, callback ) {
  let connection = mysql.createConnection( this.config );

  connection.connect();
  connection.query( sql, ( err, rows, fields ) => {
    if ( err ) {
      console.error( 'it is failed to execute the sql: ' + sql );
      throw new Error( err );
    } else {
      console.log( 'it is succeed to execute the sql: ' + sql );
      callback( rows, fields );
    }
  } );

  connection.end();
};

module.exports = DbConfig;