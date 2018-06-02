import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      hasError: false,
      error: ''
    };
  }

  componentDidCatch( error ) {
    this.setState( { hasError: true, error } );
  }

  render() {
    if( this.state.hasError ) {
      return( <h2>{ this.state.error.toString() }</h2> );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;