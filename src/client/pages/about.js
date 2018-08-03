import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import BaiduMap from '../components/baiduMap';

class About extends Component {
  constructor( props ) {
    super( props );
  }

  componentDidMount () {

    this.toolsPromise.then( ( params ) => {
      const { map, BMap, toolConstants } = params;

      this.map = map;
      this.BMap = BMap;
      this.toolConstants = toolConstants;
      console.log( params );
    } );
  }

  render() {
    return(
      <div>
        <Helmet>
          <title>About</title>
        </Helmet>
        <div style={ { height: '500px' } }>
          <BaiduMap ak='R1g6V9BEDdFBoOYlbOHPUXsHUaGjH2HL' getter={ ( getter ) => { this.toolsPromise = getter.toolsPromise } } />
        </div>
        <Link to="/map">THIS IS ABOUT PAGE.</Link>
      </div>
    );
  }
}

export { About };
export default About;