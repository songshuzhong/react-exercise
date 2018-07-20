import React from 'react';
import Loadable from 'react-loadable';

const Loading = ( props ) => {
  return <div>{ JSON.stringify( props ) }</div>
};

const LoadableHome = Loadable( {
  loader: () => import( '../pages/home' ),
  loading: Loading
} );

const LoadableAbout = Loadable( {
  loader: () => import( '../pages/about' ),
  loading: Loading
} );

const LoadableApp = Loadable( {
  loader: () => import( '../pages/app' ),
  loading: Loading
} );

const routes = [
  {
    path: '/',
    exact: true,
    component: LoadableHome
  },{
    path: '/about',
    component: LoadableAbout
  },{
    path: '/app',
    component: LoadableApp
  }
];

export default routes;