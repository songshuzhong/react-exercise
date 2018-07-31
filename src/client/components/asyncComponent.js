import React, { Component } from 'react';
import Loadable from 'react-loadable';
import ErrorCatch from './errorCatch';

const Loading = ( props ) => <div />;

const LoadableHome = Loadable( {
  loader: () => import( '../pages/home' ),
  loading: Loading
} );

const asyncComponent = ( component ) => Loadable( {
  loader: <ErrorCatch>{ () => import( '../pages/home' ) }</ErrorCatch>,
  loading: Loading
} );

export { asyncComponent };
export default asyncComponent;