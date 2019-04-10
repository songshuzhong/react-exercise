import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import '../styles/app.css';

class App extends Component {
  constructor( props ) {
    super( props );
  }

    componentDidMount() {
        alert(0)
    }

  render() {
    return(
      <div>
        <Helmet>
          <title>App</title>
        </Helmet>
        <Link to="/">THIS IS APP PAGE.</Link>
      </div>
    );
  }
}

export { App };
export default App;
