const ignore = () => {
  let extensions = [ '.css', '.scss', '.less', '.png', '.jpg', '.gif' ];

  for ( let i = 0, len = extensions.length; i < len; i++ ) {
    require.extensions[ extensions[ i ] ] = () => false;
  }
};

module.exports = ignore;