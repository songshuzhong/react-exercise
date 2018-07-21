import React from 'react';
import { Route } from 'react-router-dom';

import routes from './routers/index';

const app = () => (
  routes.map( route => <Route key={ route.path } exact={ route.exact } path={ route.path } component={ route.component } /> )
);

export default app;
