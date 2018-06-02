let responseSet = [ 'body', 'status' ];
let requireGet = [ 'query' ];
let responseGet = responseSet;
let requireSet = [];

let proto = {};

function delegateSetter( property, name ) {
  proto.__defineSetter__( name, function( value ) {
    this[ property ][ name ] = value;
  } );
}

function delegateGetter( property, name ) {
  proto.__defineGetter__( name, function() {
    return this[ property ][ name ];
  } );
}

responseGet.forEach( ele => delegateGetter( ele ) );
responseSet.forEach( ele => delegateSetter( ele ) );
requireGet.forEach( ele => delegateGetter( ele ) );
requireSet.forEach( ele => delegateSetter( ele ) );