export default function MyBrowserRouter() {
  this.currentRoute = '';
  this.routes = {};
  this.init();
};

MyBrowserRouter.prototype.route = function( path, callback ) {
  this.routes[ path ] = function( type ) {
    if ( type === 1 ) {
      history.pushState( { path }, '', path );
    } else if ( type === 2 ) {
      history.replaceState( { path }, '', path );
    }
    callback();
  }
};

MyBrowserRouter.prototype.refresh = function( path, type ) {
  this.routes[ path ]( type );
};

MyBrowserRouter.prototype.init = function() {
  let self = this;
  window.addEventListener( 'load', () => {
    self.currentRoute = location.href.slice( location.href.indexOf( '/', 8 ) );
    self.refresh( self.currentRoute );
  } );

  window.addEventListener( 'popstate', () => {
    self.currentRoute = history.state.path;
    self.refresh( self.currentRoute, 2 );
  }, false );

  let historyLinks = document.querySelectorAll( '.history-link' );
  for ( let i = 0; i < historyLinks.length; i++ ) {
    historyLinks[ i ].onclick = function ( e ) {
      e.preventDefault();
      self.currentRoute = e.target.getAttribute( 'href' );
      self.refresh( self.currentRoute, 1 );
    }
  }
};