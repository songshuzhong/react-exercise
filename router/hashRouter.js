export default function HashRouter() {
  this.routes = {};
  this.currentUrl = '';
};

HashRouter.prototype.init = function() {
  window.addEventListener( 'load', this.refresh.bind( this ), false );
  window.addEventListener( 'hashchange', this.refresh.bind( this ), false );
};

HashRouter.prototype.refresh = function () {
  this.currentUrl = location.hash.slice( 1 ) || '/';
  this.routes[ this.currentUrl ]();
};

HashRouter.prototype.route = function( path, callback ) {
  this.routes[ path ] = callback || function(){};
};