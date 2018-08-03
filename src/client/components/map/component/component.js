import { Component } from 'react';

export default class App extends Component {
  constructor( props ) {
    super( props );
  }

  bindEvent( obj, events ) {
    if ( events ) {
      events.forEach( ( e ) => {
        obj.addEventListener( e, () => {
          this.props.events && this.props.events[ e ] && this.props.events[ e ].apply( this, arguments );
        } )
      }  )
    }
  }

  bindToggleMeghods( obj, toggleMethods ) {
    for ( let key in toggleMethods ) {
      if ( this.props[ key ] !== undefined ) {
        if ( this.props[ key ] ) {
          obj[ toggleMethods[ key ][ 0 ] ]();
        } else {
          obj[ toggleMethods[ key ][ 1 ] ]();
        }
      }
    }
  }

  getOptions( options ) {
    let result = {};
    options.map( ( key ) => {
      if ( this.props[ key ] !== undefined ) {
        result[ key ] = this.props[ key ];
      }
    } );
    return result;
  }

  render() {
    return null;
  }
}