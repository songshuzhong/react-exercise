const fetchData = ( url ) => {
  return fetch( url, {
    credentials: 'include',
    headers: new Headers ( {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    } )
  } )
      .then( ( response ) => {
        if ( response.status < 200 || response.status >= 300 ) {
          const error = new Error( response.statusText );
          error.response = response;
          throw error;
        } else if ( !response.headers.get( 'Content-Type' ).startsWith( 'application/json' ) ) {
          const error = new Error( 'Content-Type should be `application/json`' );
          error.response = response;
          throw error;
        } else {
          return response.json();
        }
      } );
};

const prefetch = ( path ) => {
  /*
    if ( nextRoute.loadData ) {
      if ( Object.prototype.toString.call( nextRoute.loadData ) === '[object Function]' ) {
        return nextRoute.loadData();
      } else if ( typeof nextRoute.loadData === 'string' && nextRoute.loadData.constructor == String && ( nextRoute.loadData.startsWith( 'http://' ) || nextRoute.loadData.startsWith( 'https://' ) ) ) {
        return fetchData( nextRoute.loadData );
      }
    } else if ( settings.autoLoadData ) {
      return fetchData( nextRoute.path );
    }
  */

  return fetchData( path );

};

export default prefetch;