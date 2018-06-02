export default function reducer( state = {}, action ) {
  let type = action.type;

  switch ( type ) {
    case 'getMessages':
      return { ...state, messages: action.messages };
    case 'getMessagesPending':
    case 'getMessagesFailed':
      return { ...state };
  }

  return state;
};