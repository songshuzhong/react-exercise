import React, { isValidElement, cloneElement, Children } from 'react';
import { Switch, matchPath } from 'react-router';
import PropTypes from 'prop-types';
import prefetch from './prefetch';

class PrefetchSwitch extends Switch {

  constructor( props, context ) {
    super( props, context );

    this.state = {
      router: context.router,
      data: props.initialState
    }
  }

  getChildContext() {
    const { router: { route, ...rest } } = this.state;

    return {
      router: {
        ...rest,
        route: {
          ...route,
          data: this.state.data
        }
      }
    };
  }

  componentWillReceiveProps( nextProps, nextContext ) {
    super.componentWillReceiveProps( nextContext );

    const { router: { route: { location: { pathname: prevPathname } } } } = this.state;
    const { router: { route: { location: { pathname: nextPathname } } } } = nextContext;

    if ( prevPathname !== nextPathname ) {
      prefetch( __CONTEXT_PATH__ + nextPathname ).then( ( data ) => {
        this.setState( {
          router: nextContext.router,

          data
        } );
      } ).catch( ( error ) => {
        console.error( 'Fetching Failed', error );
      } );
    } else {
      this.setState( {
        router: nextContext.router
      } );
    }
  }

  render() {
    const { route } = this.state.router;
    const { children } = this.props;
    const location = this.props.location || route.location;
    let match, child;
    Children.forEach( children, ( element ) => {
      if ( !isValidElement( element ) ) return;

      const { path: pathProp, exact, strict, from } = element.props;
      const path = pathProp || from;

      if ( match == null ) {
        child = element;
        match = path ? matchPath( location.pathname, { path, exact, strict } ) : route.match;
      }
    } );

    return match ? cloneElement( child, { location, computedMatch: match } ) : null;
  }

}

PrefetchSwitch.childContextTypes = {
  router: PropTypes.object.isRequired
};

PrefetchSwitch.displayName = 'PrefetchSwitch';

export default PrefetchSwitch;