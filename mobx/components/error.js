import React, { Component } from 'react';

class ErrorCatch extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch( error, errorInfo ) {
    this.setState( { error, errorInfo } );
  }

  render() {
    if ( this.state.error ) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorCatch };
export default ErrorCatch;