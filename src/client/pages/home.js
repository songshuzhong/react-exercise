import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Game from '../components/game';

import '../styles/home.css';

class Home extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return(
      <div>
        <Helmet>
          <title>{ this.props.title }</title>
        </Helmet>
        <Game />
        <Link to="/about">{ this.props.content }</Link>
      </div>
    );
  }
}

Home.propTypes = {
  title: PropTypes.string,
  content: PropTypes.oneOfType( [
    PropTypes.string,
    PropTypes.func
  ] )
};

Home.defaultProps = {
  title: 'home',
  content: 'this. is. home. page.'
};

export { Home };
export default Home;