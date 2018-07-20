import fs from 'fs';
import path from 'path';
import Helmet from 'react-helmet';
import { matchPath } from 'react-router-dom';
import { getBundles } from 'react-loadable/webpack';
import serverSideRender from '../utils/renderer/ssr';

import stats from '../../dist/react-loadable.json';
import routes from '../client/routers/index';

const createTags = ( modules ) => {
  let bundles = getBundles( stats, modules );
  let scriptFiles = bundles.filter( bundle => bundle.file.endsWith( '.js' ) );
  let styleFiles = bundles.filter( bundle => bundle.file.endsWith( '.css' ) );
  let scripts = scriptFiles.map( script => `<script src="/${ script.file }"></script>` ).join( '\n' );
  let styles = styleFiles.map( style => `<link rel="stylesheet" href="/${ style.file }" />`);

  return { scripts, styles };
};

const prepHTML = ( data, { html, head, rootString, scripts, styles, initState } ) => {
  data = data.replace( '<html', `<html ${ html }` );
  data = data.replace( '</head>', `${ head } \n ${ styles }</head>` );
  data = data.replace( '<div id="root"></div>', `<div id="root">${ rootString }</div>` );
  data = data.replace( '<body>', `<body><script>window.__INITIAL_STATE__=${ JSON.stringify( { initState } )}</script>` );
  data = data.replace( '</body>', `${ scripts }</body>` );

  return data;
};

const getMatch = ( routesArray, url ) => {
  return routesArray.some( router => matchPath( url, { path: router.path, exact: router.exact } ) );
};

const makeup = ( ctx, html ) => {
  let initState = { key: 'initState' };
  let modules = [];
  let rootString = serverSideRender( ctx, modules );
  let { scripts, styles } = createTags( modules );
  let helmet = Helmet.renderStatic();

  return prepHTML( html, {
    html: helmet.htmlAttributes.toString(),
    head: helmet.title.toString() + helmet.meta.toString() + helmet.link.toString(),
    rootString,
    scripts,
    styles,
    initState
  } );
};

const createApp = async( ctx, next ) => {
  let html = fs.readFileSync( path.join( path.resolve( __dirname, '../../dist' ), 'index.html' ), 'utf-8' );
  let isMatch = getMatch( routes, ctx.req.url );

  if ( isMatch ) {

    ctx.body = await makeup( ctx, html );
  }

  await next();
};

export default createApp;