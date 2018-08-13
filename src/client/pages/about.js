import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import '../styles/about.css';

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
        <div className="box">
          <div className="girl"></div>
        </div>
      </div>
    );
  }
}

export { About };
export default About;