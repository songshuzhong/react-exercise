import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';

import * as stores from './store';
import App from './components/App';

import './assist/styles/main.less';

useStrict( true );
render(
  <Provider store={ stores }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById( 'root' )
);
