import React from 'react';
import Loadable from 'react-loadable';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../../client/store';
import App from '../../client/index';

const serverSideRender = ( ctx, modules ) => {
  return renderToString(
    <Loadable.Capture report={ moduleName => modules.push( moduleName ) }>
      <Provider store={ store }>
        <StaticRouter location={ ctx.req.url } context={ { basename: '/'} }>
          <App />
        </StaticRouter>
      </Provider>
    </Loadable.Capture>
  );
};

export default serverSideRender;