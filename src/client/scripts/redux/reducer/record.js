const initialState = { messages: [] };

export default function reducer( state = initialState, action ) {
  let type = action.type;

  switch ( type ) {
    case 'receive_msg':
      return {
        ...state,
        messages: [ ...state.messages, { ...action.data.messages }  ]
      };
    case 'user_joined_pending':
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            type: 'sys_msg',
            text: `${ action.user.username } joined the club!`
          }
        ]
      };
    case 'user_joined':
      return {
        ...state,
        users: action.users
      };
    case 'user_left_pending':
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            type: 'sys_msg',
            text: `${ action.user.username } left the club!`
          }
        ]
      };
    case 'user_left':
      return {
        ...state,
        users: action.users
      };
  }

  return state;
};
