const createServiceWorker = () => {
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then( ( registration ) => {
        if ( registration.waiting ) {
          console.log( 'sw is working.............' );
        }
        if ( registration.active ) {
          console.log( 'sw is activing.............' );
        }
      } );
  }
};

export { createServiceWorker };
export default createServiceWorker;