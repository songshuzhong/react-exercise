import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/home';
import News from '../pages/news';
import About from '../pages/about';
import Details from '../pages/details';

const Main = () => (
  <div className='main'>
    <Switch>
      <Route exact path='/' component={ Home } />
      <Route exact path='/home' component={ Home } />
      <Route exact path='/news' component={ News } />
      <Route exact path='/about' component={ About } />
      <Route exact path='/details/:id' render={ ( props ) => ( <Details { ...props } /> ) } />
      <Route render={ () => <h1>找不到此页面</h1> } />
    </Switch>
  </div>
);

export default Main;