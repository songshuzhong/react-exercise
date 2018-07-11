export const pages = {};

export const nextIndex = index => ++index % pages.length;

export const indexFromPath = path => {
  path = path === '/'? '/foo': path;

  return pages.indexOf( path.substr( 1 ) );
};