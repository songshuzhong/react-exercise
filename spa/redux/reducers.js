import { combineReducers } from 'redux';

import data from './db';

const initialState = { planlist: data, show: false };

const reducers = ( state = initialState, action ) => {
  let type = action.type;
  switch ( type ) {
    case 'details':
      let newState = state.filter( data => data.id == action.id );
      return Object.assign( {}, state, newState );
    case 'delete':
      state = state.filter( data => data.id != action.id );
      return Object.assign( {}, state );
    case 'show':
      return Object.assign( {}, state, { show: action.show } );
    case 'add':
      state.planlist.push( action.item );
      return Object.assign( {}, state, { show: action.show } )
  }

  return state;
};

export default combineReducers( { planlist: reducers } );