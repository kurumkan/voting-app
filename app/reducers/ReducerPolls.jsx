const INITIAL_STATE = {
  all: [],
  poll: null,
  userpolls: []
};

export default function(state = INITIAL_STATE, action) {

  switch (action.type) {
    case 'GET_POLLS':    
      return {
        ...state,
        all: action.payload.data.polls
      };

    case 'GET_SINGLE_POLL':    
      return {
        ...state,
        poll: action.payload.data.poll,
      };

    case 'GET_USER_POLLS':
      return {
        ...state,
        userpolls: action.payload.data.polls
      }

    default:
      return state;
  }

}