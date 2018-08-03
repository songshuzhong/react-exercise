import React from 'react';

import asyncComponent from '../components/asyncComponent';

const routes = [
  {
    path: '/',
    exact: true,
    component: asyncComponent( () => import( '../pages/home' ) )
  },{
    path: '/about',
    component: asyncComponent( () => import( '../pages/about' ) )
  },{
    path: '/app',
    component: asyncComponent( () => import( '../pages/app' ) )
  },{
    path: '/map',
    component: asyncComponent( () => import( '../pages/simple-map' ) )
  }
];

export default routes;