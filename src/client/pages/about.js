import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import '../styles/about.css'

class About extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return( [
      <Helmet key='helmet'>
        <title>About</title>
      </Helmet>,
      <Link key='link' to="/app">THIS IS ABOUT PAGE.</Link>
    ] );
  }
}

export { About };
export default About;