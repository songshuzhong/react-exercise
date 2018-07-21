import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import '../styles/app.css';

class App extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return(
      [
        <Helmet key={ 1 }>
          <title>App</title>
        </Helmet>,
        <Link key={ 2 } to="/">THIS IS APP PAGE.</Link>
      ]
    );
  }
}

export { App };
export default App;