const Singleton = (function () {
  let instance;

  function createSocket() {
    let socket = require( 'socket.io-client' ).connect();
    return socket;
  }

  return {
    getInstance: () => {
      if ( !instance ) {
        instance = createSocket()
      }

      return instance;
    }
  };
})();

export default Singleton;