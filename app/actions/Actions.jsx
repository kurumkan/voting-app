import axios from 'axios';
import {browserHistory} from 'react-router';
const ROOT_URL = '/api/polls/';

export function getPolls(){
	return function(dispatch){
		axios.get(ROOT_URL)
			.then((response)=>{					
				dispatch({
					type: 'GET_POLLS',
					payload: response
				});
			})
			.catch(()=>{
				dispatch(setError('Something went wrong. We are working on it.'));
			})
	}	
}

export function getSinglePoll(id){
	return function(dispatch){
		axios.get(ROOT_URL+id)
			.then((response)=>{					
				dispatch({
					type: 'GET_SINGLE_POLL',
					payload: response
				});
			})
			.catch(()=>{				
				browserHistory.push('404');
			})		
	}	
}

export function createPoll(poll){
	return function(dispatch){
		axios.post(ROOT_URL, poll)
			.then((response)=>{					
				dispatch({
					type: 'CREATE_POLL',	
					payload: response
				});				
				browserHistory.push('polls/'+response.data.id);
			})
			.catch(()=>{				
				browserHistory.push('polls/');
			})			
	}
}

export function deletePoll(id){
	var request = axios.delete(ROOT_URL+id);
	return{
		type: 'DELETE_POLL',
		payload: request
	}
}

export function updatePoll(id, updatedPoll){
	var request = axios.put(ROOT_URL+id, updatedPoll);
	return {
		type: 'UPDATE_POLL',
		payload: request
	}
}

export function setError(error){
	return {
		type: 'ERROR',
		payload: error
	}
}
