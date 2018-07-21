import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

class About extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return(
      [
        <Helmet key={ 1 }>
          <title>About</title>
        </Helmet>,
        <Link key={ 2 } to="/app">THIS IS ABOUT PAGE.</Link>
      ]
    );
  }
}

export { About };
export default About;