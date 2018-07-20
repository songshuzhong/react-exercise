import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../styles/app.css';

class App extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return(
      <div>
        <Link to="/">THIS IS APP PAGE.</Link>
      </div>
    );
  }
}

export { App };
export default App;