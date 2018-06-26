import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'mobx-react';

import App from './pages';
import ErrorCatch from './components/error';
import * as stores from './store';

import './assets/styles/main.less';

ReactDOM.render(
  <Provider store={ stores }>
    <BrowserRouter>
      <ErrorCatch>
        <App />
      </ErrorCatch>
    </BrowserRouter>
  </Provider>,
  document.getElementById( 'root' ),
);