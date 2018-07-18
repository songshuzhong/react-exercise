import React from 'react';
import { hydrate, render } from 'react-dom';
import BrowserRouter from 'react-router-dom';
import Loadable from 'react-loadable';

import { RenderRoutes } from './routers/utils';
import routes from './routers/index';

window.main = () => {
  Loadable.preloadReady().then( () => {
    hydrate(
      <BrowserRouter>
        <RenderRoutes routes={ routes } />
      </BrowserRouter>,
      document.getElementById( 'root' ) );
  } );
};



