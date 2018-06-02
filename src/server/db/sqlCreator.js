let DbConfig = require( './dbConfig' );

function SqlCreator() {
  this.sql = '';

  this.reunite = function( param ) {
    param = param === undefined? "*": param;

    this.sql = 'select ' + param + ' from (' + this.sql + ')unite';
    return this;
  };

  this.select = function( param ) {
    param = param === undefined? "*": param;

    this.sql = 'select ' + param;
    return this;
  };

  this.delete = function () {
    this.sql = 'delete ';
    return this;
  };

  this.from = function( table ) {
    if ( table === undefined ) throw new Error( 'sql select table is undefined.' );

    this.sql += ' from ' + table;
    return this;
  };

  this.where = function( column, sign, value ) {
    this.sql += ' where ' + column + sign + "'" + value + "'";
    return this;
  };

  this.andWhere = function( column, sign, value ) {
    this.sql += ' and ' + column + sign + "'" + value + "'";
    return this;
  };

  this.betweenWhere = function( column, value1, value2 ) {
    this.sql += ' where ' + column + ' between ' + value1 + ' and ' + value2;
    return this;
  };

  this.insert = function( table ) {
    if ( table === undefined ) throw new Error( 'sql insert table is undefined' );

    this.sql = 'insert into ' + table;
    return this;
  };

  this.set = function( columns ) {
    let sqlInfo = [];
    for( let key in columns ) {
      sqlInfo.push( key );
    }

    this.sql += ' (' + sqlInfo.join( ',' ) + ')';
    return this;
  };

  this.values = function( values ) {
    let sqlInfo = [];
    for( let key in values ) {
      sqlInfo.push( "'" + values[ key ] + "'" );
    }
    this.sql += ' values (' + sqlInfo.join( ',' ) + ');';

    return this;
  };

}

SqlCreator.instance = function() {
  return new SqlCreator();
};

SqlCreator.prototype.execute = function( database, callback ) {
  let dbConfig = new DbConfig( database );

  try {
    dbConfig.execute( this.sql, callback );
  } catch( e ) {
    throw new Error( e.toString() );
  }

};

module.exports = SqlCreator;