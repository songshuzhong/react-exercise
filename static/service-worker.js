const cacheStorageKey = 'react-exercise-pwa';
const cacheList = [];

self.addEventListener( 'install', ( e ) => {
  e.waitUntil(
    caches.open( cacheStorageKey ).then( ( cache ) => {
      console.log( 'adding to cache:', cacheList );
      return cache.addAll( cacheList )
    } ).then( () => {
      console.log( 'install event open cache ' + cacheStorageKey );
      console.log( 'skip waiting' );
      return self.skipWaiting();
    } )
  );
} );

self.addEventListener( 'activate', ( e ) => {
  const cacheDeletePromises = caches.keys().then( cacheNames => {
    return Promise.all( cacheNames.map( name => {
      if ( name !== cacheStorageKey ) {
        console.log( 'caches.delete', caches.delete );
        let deletePromise = caches.delete( name );
        console.log( 'cache delete result: ', deletePromise );
        return deletePromise;
      } else {
        return Promise.resolve();
      }
    } ) );
  } );

  console.log( 'cacheDeletePromises: ', cacheDeletePromises );
  e.waitUntil( Promise.all( [ cacheDeletePromises ] ) )
    .then( () => {
      console.log( 'activate event ' + cacheStorageKey );
      console.log( 'Clients claims' );

      return self.clients.claim();
    } );
} );

self.addEventListener( 'fetch', ( e ) => {
  if ( !( e.request.url.indexOf( 'http' ) === 0 ) ) { return; }
  if ( !( e.request.method.toLowerCase() === 'get' ) ) { return }

  e.respondWith( fetch( e.request.url ).then( ( httpRes ) => {
    if ( !httpRes || httpRes.status !== 200 ) {
      return caches.match( e.request );
    }

    let responseClone = httpRes.clone();
    caches.open( cacheStorageKey ).then( cache => {
      return cache.delete( e.request ).then( () => {
        cache.put( e.request, responseClone );
      } );
    } );

    return httpRes;
  } ).catch( ( err ) => {
    alert( '当前网络不佳，信息会在网络顺畅时更新！' );
    return caches.match( e.request );
  } ) );
} );