import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const page = {
  title: 'EPM-UI'
};

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

About.page = page;

export { About };
export default About;