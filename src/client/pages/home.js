import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import '../styles/home.css';

class Home extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return(
      <div>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <button onClick={ () => this.props.addNumber( 1 ) }>add</button>
        <Link to="/about">THIS IS HOME HOME.{ JSON.stringify( this.props.numberList ) }</Link>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    numberList: state.numberList
  }
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    addNumber: ( number ) => { dispatch( { type: 'add', number } ) },
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( Home );