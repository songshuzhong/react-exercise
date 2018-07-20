import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../styles/home.css';

class Home extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return(
      <div>
        <Link to="/about">THIS IS HOME HOME.</Link>
      </div>
    );
  }
}

export { Home };
export default Home;