import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import routes from './routers/index';

import './styles/index.css';

window.main = () => {
  Loadable.preloadReady().then( () => {
    hydrate(
      <BrowserRouter>
        <div>
          {
            routes.map( route => <Route key={ route.path } exact={ route.exact } path={ route.path } component={ route.component } /> )
          }
        </div>
      </BrowserRouter>,
      document.getElementById( 'root' ) );
  } );
};



