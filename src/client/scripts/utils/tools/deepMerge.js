/** 数据的深度合并 */
const merge = ( def, obj ) => {
  if ( !obj ) {
    return def;
  } else if ( !def ) {
    return obj;
  }

  for ( const i in obj ) {
    // if its an object
    if ( obj[ i ] != null && obj[ i ].constructor === Object ) {
      def[ i ] = merge( def[ i ], obj[ i ] );
    }

    // if its an array, simple values need to be joined.  Object values need to be remerged.
    else if ( obj[ i ] != null && ( obj[ i ] instanceof Array ) && obj[ i ].length > 0 ) {
      // test to see if the first element is an object or not so we know the type of array we're dealing with.
      if ( obj[ i ][ 0 ].constructor === Object ) {
        const newobjs = [];

        // create an index of all the existing object IDs for quick access.  There is no way to know how many items will be in the arrays.
        const objids = {};

        for ( let x = 0, l = def[ i ].length; x < l; x++ ) {
          objids[ def[ i ][ x ].id ] = x;
        }

        // now walk through the objects in the new array
        // if the ID exists, then merge the objects.
        // if the ID does not exist, push to the end of the def array
        for ( let x = 0, l = obj[ i ].length; x < l; x++ ) {
          const newobj = obj[ i ][ x ];

          if ( objids[ newobj.id ] !== undefined ) {
            def[ i ][ x ] = merge( def[ i ][ x ], newobj );
          } else if ( objids[ newobj.id ] === undefined ) {
            newobjs.push( newobj );
          }
        }

        for ( let x = 0, l = newobjs.length; x < l; x++ ) {
          def[ i ].push( newobjs[ x ] );
        }
      } else {
        for ( let x = 0; x < obj[ i ].length; x++ ) {
          const idxObj = obj[ i ][ x ];

          if ( def[ i ].indexOf( idxObj ) === -1 ) {
            def[ i ].push( idxObj );
          }
        }
      }
    } else { def[ i ] = obj[ i ]; }
  }

  return def;
};

export { merge };
