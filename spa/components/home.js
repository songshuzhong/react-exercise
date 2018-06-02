import React, { PureComponent } from 'react';
import { Link, Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import { App } from './app';
import Plan from './plan';
import Details from './details';
import TestRouter from './testrouter';
import Pupop from './pupop';

import logo from '../media/logo.svg';
import '../style/home.css';

const history = createHistory();

class Home extends PureComponent {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className='App-title'>Welcome to React Plan</h2>
        </div>
        <Router history={ history }>
          <div className="contentBox">
            <ul className="nav">
              <li><Link to="/">app</Link></li>
              <li><Link to="/plan">plan</Link></li>
              <li><Link to="/test-router">test-router</Link></li>
            </ul>
            <div className="content">
              <Route path="/" component={ App } />
              <Route path="/plan" component={ Plan } />
              <Route path="/details/:topicId" component={ Details } />
              <Route path="/test-router" component={ TestRouter } />
            </div>
          </div>
        </Router>
        <Pupop />
      </div>
    );
  }
}

export default Home;