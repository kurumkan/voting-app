import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';


//Load bootstrap
require('style!css!bootstrap/dist/css/bootstrap.min.css');
// App css
require('style!css!sass!applicationStyles');

import RootReducer from 'RootReducer';
import Main from 'Main';
import PollsList from 'PollsList';
import NewPoll from 'NewPoll';
import MyPolls from 'MyPolls';

var createStoreWithMiddleware = applyMiddleware(ReduxThunk, ReduxPromise)(createStore);

var store = createStoreWithMiddleware(RootReducer);
var token = localStorage.getItem('token');

if(token){	
	store.dispatch({type:'AUTH_USER'});
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>	
			<Route path="/" component={Main}>	
				<IndexRoute component={PollsList} />		
			 	<Route path="polls" component={PollsList} /> 
				<Route path="polls/new" component={NewPoll} />			
				<Route path="mypolls" component={MyPolls} />									
			</Route>		
		</Router>
	</Provider>,	

	document.getElementById("app")
);


