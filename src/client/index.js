import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from './routers/index';
import NoMatch from './components/noMatch';

const app = () => (
  <Switch>
    {
      routes.map( route => <Route key={ route.path } exact={ route.exact } path={ route.path } component={ route.component } /> )
    }
    <Route component={ NoMatch } />
  </Switch>
);

export default app;
