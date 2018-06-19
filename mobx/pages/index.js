import React, { PureComponent } from 'react';

import { Switch, Route } from 'react-router-dom';

import asyncComponent from '../../utils/asyncComponent';

import Header from '../components/header';
import Footer from '../components/footer';

export default class App extends PureComponent {
  render() {
    return (
      <div className='main'>
        <Header { ...this.props.location }/>
        <Switch>
          <Route exact path='/' component={ asyncComponent( () => import('./home') ) }/>
          <Route exact path='/home' component={ asyncComponent( () => import('./home') ) }/>
          <Route exact path='/news' component={ asyncComponent( () => import('./news') ) }/>
          <Route exact path='/about' component={ asyncComponent( () => import('./about') ) }/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}