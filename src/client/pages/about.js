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
      <h2 key='link'>this is about，<Link to="/app">redirect to app.</Link></h2>
    ] );
  }
}

export { About };
export default About;
