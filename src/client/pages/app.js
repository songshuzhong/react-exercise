import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import '../styles/app.css';
import logo from '../styles/logo.svg';

class App extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return(
      <div>
        <Helmet>
          <title>App</title>
        </Helmet>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Edit <code>src/App.js</code> and save to reload.</p>
            <Link className="App-link" to="/">redirect to home.</Link>
          </header>
        </div>
      </div>
    );
  }
}

export { App };
export default App;
