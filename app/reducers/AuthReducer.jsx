export default function(state={}, action){
	switch(action.type){
		case 'AUTH_USER':
			return {...state, authenticated: true, username: action.payload}
		case 'UNAUTH_USER':
			return {...state, authenticated: false, username: ''}			
		default: 
			return state;
	}
}




