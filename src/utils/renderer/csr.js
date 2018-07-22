import React from 'react';
import { render, hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable'
import { Provider } from 'react-redux';

import store from '../../client/store';
import App from '../../client/index';

const clientSideRender = ( modules = [] ) => (
  Loadable.preloadReady().then( () => {
    hydrate(
      <Loadable.Capture report={ moduleName => { modules.push( moduleName ) } }>
        <Provider store={ store }>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </Loadable.Capture>,
      document.getElementById( 'root' ),
      () => document.body.removeChild( document.body.lastElementChild )
    )
  } )
);

export default clientSideRender;