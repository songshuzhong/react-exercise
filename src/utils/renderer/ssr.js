import React from 'react';
import Loadable from 'react-loadable';
import { Provider } from 'mobx-react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import * as stores from '../../client/store';
import App from '../../client/index';

const serverSideRender = ( ctx, modules ) => {
  return renderToString(
    <Loadable.Capture report={ moduleName => modules.push( moduleName ) }>
      <Provider store={ stores }>
        <StaticRouter location={ ctx.req.url } context={ { basename: '/'} }>
          <App />
        </StaticRouter>
      </Provider>
    </Loadable.Capture>
  );
};

export default serverSideRender;