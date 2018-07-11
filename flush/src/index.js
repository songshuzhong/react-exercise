import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import AppContainer from 'react-hot-loader/lib/AppContainer';

import App from './components/app';

const history = createHistory();

const render = App =>
  ReactDOM.hydrate(
    <AppContainer>
      <App history={ history } />
    </AppContainer>,
    document.getElementById( 'root' )
  );

render( App );