import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import { RenderRoutes } from './utils/router';
import routes from './routers/router.config';

import '../styles/nprogress.less';

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <RenderRoutes routes={ routes } />
    </BrowserRouter>
  </Provider>,
  document.getElementById( 'root' )
);