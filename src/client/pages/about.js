import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

class About extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return(
      <div>
        <Helmet>
          <title>About</title>
        </Helmet>
        <Link to="/map">THIS IS ABOUT PAGE.</Link>
      </div>
    );
  }
}

export { About };
export default About;