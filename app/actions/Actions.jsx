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
				dispatch(removeErroMessage());
			})
			.catch(()=>{				
				dispatch(setErrorMessage('Something went wrong. We are working on it.'));
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
				dispatch(removeErroMessage());
			})
			.catch(()=>{				
				browserHistory.push('404');
			})		
	}	
}
			
export function createPoll(poll){
	return function(dispatch){
		axios.post(ROOT_URL, poll, {
			headers: {authorization: localStorage.getItem('token')}				
		})
			.then((response)=>{					
				dispatch({
					type: 'CREATE_POLL',	
					payload: response
				});				
				browserHistory.push('polls/'+response.data.id);
				dispatch(removeErroMessage());
			})
			.catch((error)=>{
				if(error.response.status==401){
					dispatch(setErrorMessage("Only authorized users can create polls"));	
				}else{
					dispatch(setErrorMessage('Something went wrong. We are working on it.'));	
				}				
			})			
	}
}

export function deletePoll(id){
	return function(dispatch){
		axios.delete(ROOT_URL+id, {
			headers: {authorization: localStorage.getItem('token')}				
		})
			.then((response)=>{
				dispatch({
					type: 'DELETE_POLL',
					payload: response
				});
				browserHistory.push('polls/');
				dispatch(removeErroMessage());
			})	
			.catch((error)=>{
				if(error.response.status==403){
					dispatch(setErrorMessage("Only the poll's author can delete it!"));	
				}else{
					dispatch(setErrorMessage('Something went wrong. We are working on it.'));	
				}				
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
				dispatch(removeErroMessage());
			})
			.catch(()=>{
				dispatch(setErrorMessage('Something went wrong. We are working on it.'));
			})
	}	
}

export function getUserPolls(){
	return function(dispatch){
		axios.get('/api/mypolls', {
			headers: {authorization: localStorage.getItem('token')}				
		})
			.then((response)=>{					
				dispatch({
					type: 'GET_USER_POLLS',
					payload: response
				});
				dispatch(removeErroMessage());
			})
			.catch((error)=>{
				if(error.response.status==401){
					dispatch(setErrorMessage("Please sign in or create a new account!"));	
				}else{
					dispatch(setErrorMessage('Something went wrong. We are working on it.'));	
				}				
			})		
	}	
}

export function setErrorMessage(error){
	return {
		type: 'SET_ERROR',
		payload: error
	}
}

export function removeErroMessage(){
	return {
		type: 'REMOVE_ERROR'
	}
}


export function signinUser({login, password}){	
	
	return function(dispatch){		
		axios.post('/signin', {login, password})
			.then((response)=>{				
				//-update state to indicate user is authenticated
				dispatch({type: 'AUTH_USER'});
				//-save jwt token
				localStorage.setItem('token', response.data.token);

				browserHistory.push('/');

				dispatch(removeErroMessage());
			})
			.catch(()=>{
				//- show error message
				dispatch(setErrorMessage('Bad Login Info'));
			});
	}	
}

export function signupUser({username, email, password}){
	//by using redux-thunk we have direct access to dispatch method
	//also action creator now returns a function, no an object
	//this function will immediately be called by redux thunk with dispatch method
	
	return function(dispatch){		
		axios.post('/signup', {username, email, password})
			.then((response)=>{				
				//-update state to indicate user is authenticated
				dispatch({type: 'AUTH_USER'});
				//-save jwt token
				localStorage.setItem('token', response.data.token);
				
				browserHistory.push('/');

				dispatch(removeErroMessage());
			})
			.catch(()=>{
				//- show error message
				dispatch(setErrorMessage('This email or username are already in use'));
			});
	}	
}

export function signoutUser(){
	localStorage.removeItem('token');
	return {
		type: 'UNAUTH_USER'
	}
}

