import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import '../styles/home.css';

class Home extends Component {
  constructor( props ) {
    super( props );
    this.state = { list: '' };
  }

  componentDidMount() {
    fetch( '/api/pageModel/list', { method: 'get', credentials: 'same-origin' } )
      .then( res => res.json() )
      .then( list => this.setState( { list } ) );
  }

  render() {
    const { list } = this.state;

    return( [
      <Helmet key='helmet'>
        <title>Home</title>
      </Helmet>,
      <ul key='ul'>
        { list? list.data.map( ( item, index ) => <li key={ item }>{ index }</li> ): '' }
      </ul>,
      <h2 key='title'>
        <Link to="/about">redirect to about</Link>
      </h2>
    ] );
  }
}

export { Home };
export default Home;
