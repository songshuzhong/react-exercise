import React from 'react';
import Loadable from 'react-loadable';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Switch } from 'react-router-dom';

import App from '../../client/index';

const serverSideRender = ( ctx, modules ) => {
  return renderToString(
    <Loadable.Capture report={ moduleName => modules.push( moduleName ) }>
      <StaticRouter location={ ctx.req.url } context={ { basename: '/'} }>
        <App />
      </StaticRouter>
    </Loadable.Capture>
  );
};

export default serverSideRender;