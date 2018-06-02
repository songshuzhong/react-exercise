export default function reducer( state = {}, action ) {
  let type = action.type;

  switch ( type ) {
    case 'getUsers':
      return { ...state, ...action };
    case 'getUsersPending':
    case 'getUsersFailed':
      return { ...state, ...action };
    case 'deleteUser':
      return new Object( { ...state, ...action } );
    case 'deleteUserPending':
    case 'deleteUserFailed':
      return state;
  }

  return state;
};