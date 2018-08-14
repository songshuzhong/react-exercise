class GPromise {
  constructor( executor ) {
    this._promiseStatus = GPromise.PENDING;
    this._promiseValue = '';

    this.execute( executor );
  }

  execute( executor ) {
    if ( typeof executor !== 'function' ) {
      throw new Error( `Promise resolver ${ executor } is not a function` );
    }

    try {
      executor( data => {
        this._promiseStatus =  GPromise.FULFILLED;
        this._promiseValue = data;
      }, data => {
        this._promiseStatus = GPromise.RESOLVED;
        this._promiseValue = data;
      } );
    } catch ( e ) {
      this._promiseStatus = GPromise.REJECTED;
      this._promiseValue = e;
    }
  }

  then( onfulfilled, onrejected ) {
    let _ref = null;
    let timer = null;
    let result = new GPromise( () => {} );

    timer = setInterval( () => {
      if ( ( typeof onfulfilled === 'function' && this._promiseStatus === GPromise.FULFILLED ) ||
        ( typeof onrejected === 'function' && this._promiseStatus === GPromise.REJECTED ) ) {
        clearInterval( timer );
        try {
          if ( this._promiseStatus === GPromise.FULFILLED ) {
            _ref = onfulfilled( this._promiseValue );
          } else {
            _ref = onrejected( this._promiseValue );
          }

          if ( _ref instanceof GPromise ) {
            timer = setInterval( () => {
              if ( _ref._promiseStatus === GPromise.FULFILLED || _ref._promiseStatus === GPromise.REJECTED ) {
                clearInterval( timer );

                result._promiseValue = _ref._promiseValue;
                result._promiseStatus = _ref._promiseStatus;
              }
            }, 0 );
          } else {
            result._promiseValue = _ref;
            result._promiseStatus = GPromise.FULFILLED;
          }
        } catch ( e ) {
          result._promiseStatus = GPromise.REJECTED;
          result._promiseValue = e;
        }
      }
    }, 0 );

    return result;
  }
}

GPromise.PENDING = 'pending';
GPromise.FULFILLED = 'resolved';
GPromise.REJECTED = 'rejected';

export default GPromise;