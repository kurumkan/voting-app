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
				dispatch(setError('Something went wrong. We are working on it.'));
			})			
	}
}

export function deletePoll(id){
	return function(dispatch){
		axios.delete(ROOT_URL+id)
			.then((response)=>{
				dispatch({
					type: 'DELETE_POLL',
					payload: response
				});
				browserHistory.push('polls/');
			})	
			.catch(()=>{
				dispatch(setError('Something went wrong. We are working on it.'));
			})	
	}
}

export function updatePoll(id, updatedPoll){
	return function(dispatch){
		axios.put(ROOT_URL+id, updatedPoll)
			.then((response)=>{
				dispatch({
					type: 'UPDATE_POLL',
					payload: response
				});
			})
			.catch(()=>{
				dispatch(setError('Something went wrong. We are working on it.'));
			})
	}	
}

export function setError(error){
	return {
		type: 'ERROR',
		payload: error
	}
}
