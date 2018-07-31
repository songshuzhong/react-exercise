import React, { Component } from 'react';

class ErrorCatch extends Component {
  constructor( props ) {
    super( props );
    this.state = { hasError: false, info: '' };
  }

  componentDidCatch( error, info ) {
    this.setState( { hasError: true, info } );
  }

  render() {
    if ( this.state.hasError ) {
      return <h1>{ this.state.info }</h1>
    }

    return this.props.children;
  }
}

export { ErrorCatch };
export default ErrorCatch;