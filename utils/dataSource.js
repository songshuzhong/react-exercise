const abortFetch = ( f ) => {
  const o = {};

  return () => {
    const handlePromise = new Promise( ( resolve, reject ) => {
      Object.defineProperty( o, 'cancel', {
        set() {
          reject( 'the request is aborted!');
        }
      } );

      f.then( ( v ) => resolve( v ) ).catch( ( e ) => reject( e ) );
    } );

    return Object.assign(
      handlePromise,
      {
        cancel() {
          o.cancel = true;
        }
      }
    )
  }
};

export default abortFetch;