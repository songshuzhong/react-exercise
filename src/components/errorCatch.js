import React, { Component } from 'react';

class ErrorCatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch( error, errorInfo ) {
    this.setState( {
      error: error,
      errorInfo: errorInfo
    } );
  }

  render() {
    if ( this.state.errorInfo ) {
      return ( [
        <h2 key='title'>Something went wrong.</h2>,
        <details key='details' style={{ whiteSpace: 'pre-wrap' }}>
          { this.state.error && this.state.error.toString() }
          <br />
          { this.state.errorInfo.componentStack }
        </details>
      ] );
    }

    return this.props.children;
  }
}

export { ErrorCatch };
export default ErrorCatch;