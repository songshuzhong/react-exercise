import { combineReducers } from 'redux';

const initialState = { number: [] };

const reducers = ( state = initialState, action ) => {
  let type = action.type;
  switch ( type ) {
    case 'add':
      state.number.push( action.number );
      return Object.assign( {}, state )
  }

  return state;
};

export default combineReducers( { numberList: reducers } );