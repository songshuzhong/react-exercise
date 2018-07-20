import React from 'react';
import { Route } from 'react-router-dom';

import routes from './routers/index';

const app = () => (
  <div>
    {
      routes.map( route => <Route key={ route.path } exact={ route.exact } path={ route.path } component={ route.component } /> )
    }
  </div>
);

export default app;
