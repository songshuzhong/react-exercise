import React, { createElement } from 'react';
import { Route } from 'react-router';

import NProgress from '../build-utils/nprogress';

class PrefetchRoute extends Route {

  componentWillMount() {
    let promise = new Promise( ( resolve, reject ) => {
      if ( window ) {
        resolve( true );
      } else {
        reject( false );
      }
    } );

    promise.then( ( nprogress ) => { if ( nprogress ) { NProgress.start(); NProgress.done(); } } );
  }

  componentWillUpdate( nextProps, nextState ) {
    if ( nextProps.location.pathname != this.context.router.route.location.pathname ) {
      NProgress.start();
    }
  }

  componentDidUpdate( prevProps, prevState ) {
    if ( prevProps.location.pathname != this.context.router.route.location.pathname ) {
      NProgress.done();
    }
  }

  render() {
    const { match } = this.state;
    const { children, component, render, initialState } = this.props;
    const { history, route, staticContext } = this.context.router;
    const location = this.props.location || route.location;
    const data = this.props.data || route.data;
    const props = { match, location, history, staticContext, data, initialState };

    return (
        component ? (
            match ? createElement( component, props ) : null
        ) : render ? (
            match ? render( props ) : null
        ) : children ? (
            typeof children === 'function' ? (
                children( props )
            ) : !isEmptyChildren( children ) ? (
                React.Children.only( children )
            ) : (
                null
            )
        ) : (
            null
        )
    );
  }

}

PrefetchRoute.displayName = 'PrefetchRoute';

export default PrefetchRoute;