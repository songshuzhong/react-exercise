import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import '../styles/home.css';

class Home extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return( [
      <Helmet key='helmet'>
        <title>Home</title>
      </Helmet>,
      <Link key='link' to="/about">THIS IS HOME HOME.</Link>
    ] );
  }
}

export { Home };
export default Home;