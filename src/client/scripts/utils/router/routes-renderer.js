import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import PrefetchSwitch from './prefetch-switch';
import PrefetchRoute from './prefetch-route';

const RenderRoutes = ( { routes, initialState = {}, autoLoadData = false } = {} ) => {
  if ( autoLoadData ) {
    return (
        <PrefetchSwitch initialState={ initialState }>
          {
            routes.map( ( route, i ) => (
                route.redirect ?
                    <Redirect
                        key={ i }
                        from={ route.from }
                        to={ route.to }
                    /> :
                    <PrefetchRoute
                        key={ i }
                        path={ route.path }
                        exact={ route.exact }
                        strict={ route.strict }
                        render={ ( props ) => (
                            <route.component { ...props } routes={ route.routes } />
                        ) }
                    />
            ) )
          }
        </PrefetchSwitch>
    );
  } else {
    return (
        <Switch>
          {
            routes.map( ( route, i ) => (
                route.redirect ?
                    <Redirect
                        key={ i }
                        from={ route.from }
                        to={ route.to }
                    /> :
                    <Route
                        key={ i }
                        path={ route.path }
                        exact={ route.exact }
                        strict={ route.strict }
                        render={ ( props ) => (
                            <route.component { ...props } data={ {} } routes={ route.routes } />
                        ) }
                    />
            ) )
          }
        </Switch>
    );
  }
};

export default RenderRoutes;