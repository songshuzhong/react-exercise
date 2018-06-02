import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import store from './redux/store';
import Home from './components/home';

import './style/component.css';

ReactDOM.render(
  <Provider store={ store }>
    <Home />
  </Provider>,
  document.getElementById( 'root' )
);

