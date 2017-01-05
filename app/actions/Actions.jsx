import axios from 'axios';
import {browserHistory} from 'react-router';
const ROOT_URL = '/api/polls/';

export function getPolls(){
	var request = axios.get(ROOT_URL);

	return {
		type: 'GET_POLLS',
		payload: request
	};
}

export function getSinglePoll(id){
	var request = axios.get(ROOT_URL+id);
	return {
		type: 'GET_SINGLE_POLL',
		payload: request
	};	
}

export function createPoll(poll){
	var request = axios.post(ROOT_URL, poll);
	return {
	    type: 'CREATE_POLL',
	    payload: request,
	};
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


export function signinUser({email, password}){
	//by using redux-thunk we have direct access to dispatch method
	//also action creator now returns a function, no an object
	//this function will immediately be called by redux thunk with dispatch method
	return function(dispatch){		
		axios.post('/signin', {email, password})
			.then((response)=>{				
				//-update state to indicate user is authenticated
				dispatch({type: 'AUTH_USER'});
				//-save jwt token
				localStorage.setItem('token', response.data.token);
				//-redirect to the secret page
				browserHistory.push('/');
			})
			.catch(()=>{
				//- show error message
				dispatch(authError('Bad Login Info'));
			});
	}	
}

export function signupUser({email, password}){
	//by using redux-thunk we have direct access to dispatch method
	//also action creator now returns a function, no an object
	//this function will immediately be called by redux thunk with dispatch method
	
	return function(dispatch){		
		axios.post(API_URL+'/signup', {email, password})
			.then((response)=>{				
				//-update state to indicate user is authenticated
				dispatch({type: 'AUTH_USER'});
				//-save jwt token
				localStorage.setItem('token', response.data.token);
				//-redirect to the secret page
				browserHistory.push('/');
			})
			.catch(()=>{
				//- show error message
				dispatch(authError('This email is already in use'));
			});
	}	
}

export function authError(error){
	return {
		type: 'AUTH_ERROR',
		payload: error
	}
}

export function signoutUser(){
	localStorage.removeItem('token');
	return {
		type: 'UNAUTH_USER'
	}
}
