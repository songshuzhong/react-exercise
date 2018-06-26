import React, { Component } from 'react';

import Header from '../components/header';
import Footer from '../components/footer';
import Main from '../routers/config';

export default class App extends Component {
  render() {
    return (
      <div className='main'>
        <Header { ...this.props.location }/>
        <Main />
        <Footer/>
      </div>
    );
  }
}