export default function(state='', action){
	
	switch(action.type){

		case 'SHOW_ERROR':	
			return action.payload.data;

		default:
			return state;	
	}
}