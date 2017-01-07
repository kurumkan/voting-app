const INITIAL_STATE = {
  all: [],
  poll: null,
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

    default:
      return state;
  }

}