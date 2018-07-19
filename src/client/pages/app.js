import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class App extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return(
      <div>
        <Link to="/home">THIS IS APP PAGE.</Link>
      </div>
    );
  }
}

export { App };
export default App;