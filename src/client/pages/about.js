import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class About extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return(
      <div>
        <Link to="/app">THIS IS ABOUT PAGE.</Link></div>
    );
  }
}

export { About };
export default About;