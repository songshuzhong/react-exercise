import { merge } from './deepMerge';

/**
 *   getDataSource 方法接收两个参数。
 *   dataSource: 数据源
 *   callback: 回调函数
 */
const getDataSource = ( dataSource, callback, time = 5000 ) => {

  const dispatchDataSource = ( dataSource, callback ) => {
    if ( typeof dataSource === 'string' && fetch ) {
      return fetch( dataSource, {
        method: 'GET',
        credentials: 'same-origin',
        header: {
          'Content-Type': 'application/json',
          'Access-Token': sessionStorage.getItem('access_token') || ''
        }
      } )
    } else if ( typeof dataSource === 'object' ) {
      let { url, params } = dataSource;
      params = merge(
        {
          method: 'post',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Access-Token': sessionStorage.getItem('access_token') || ''
          },
          body: ''
        }, params );

      return fetch( url, { method: params.method, credentials: params.credentials, headers: params.headers, body: params.body } )
    } else if ( dataSource instanceof Promise ) {
      return dataSource
    } else {
      return callback( dataSource );
    }
  };

  return Promise.race( [
    dispatchDataSource( dataSource, callback ),
    new Promise( ( resolve, reject ) => { setTimeout( () => reject( new Error( 'request time out!') ), time ) } )
  ] )
    .then( ( res ) => {
      if ( res.status >= 200 && res.status < 300 ) {
        const token = res.headers.get( 'access-token' );
        if ( token ) {
          sessionStorage.setItem( 'access_token', token );
        }
        return res;
      } else {
        let error = new Error( res.statusText );
        error.response = res;
        throw error;
      } } )
    .then( ( res ) => res.json() )
    .then( ( data ) => { callback( data ) } )
    .catch( ( error ) => { throw new Error( error.toString() ) } );
};

export { getDataSource };
