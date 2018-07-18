import React from 'react';
import Loadable from 'react-loadable';

const Loading = ( props ) => {
  console.log( props );
  return <div>Loading......</div>
};

const LoadableHome = Loadable( {
  loader: () => import( '../pages/home' ),
  loading: Loading
} );

const LoadableAbout = Loadable( {
  loader: () => import( '../pages/about' ),
  loading: Loading
} );

const routes = [
  {
    path: '/',
    exact: true,
    component: LoadableHome
  },{
    path: '/home',
    exact: true,
    component: LoadableHome
  },{
    path: '/about',
    exact: true,
    component: LoadableAbout
  }
];

export default routes;