import React from 'react';
import ReactDOM from 'react-dom/server';
import createHistory from 'history/createMemoryHistory';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import App from '../src/index';

export default ( { clientStats } ) => ( req, res ) => {
  let history = createHistory( { initialEntries: [ req.path ] } );
  let app = ReactDOM.renderToString( <App history={ history } /> );
  let chunkNames = flushChunkNames();

  let { js, styles, cssHash, scripts, stylesheets } = flushChunks( clientStats, { chunkNames } );

  console.log( 'path', req.path );
  console.log( 'dynamic chunk names rendered', chunkNames );
  console.log( 'scripts served', scripts );
  console.log( 'stylesheet served', stylesheets );

  res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>boilerplate</title>
          ${ styles }
        </head>
        <body>
          <div id="root">${ app }</div>
          ${ cssHash }
          ${ js }
        </body>
      </html>
    `
  );
}