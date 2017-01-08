import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';


//Load bootstrap
require('style!css!bootstrap/dist/css/bootstrap.min.css');
// App css
require('style!css!sass!applicationStyles');


import RootReducer from 'RootReducer';
import Main from 'Main';
import PollsList from 'PollsList';
import NewPoll from 'NewPoll';
import MyPolls from 'MyPolls';
import Poll from 'Poll';
import NotFound404 from 'NotFound404';

//auth components
import Signin from 'Signin';
import Signup from 'Signup';
import Signout from 'Signout';


var createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

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
				<Route path="polls/mypolls" component={MyPolls} />			
				<Route path="polls/:id" component={Poll} />

				<Route path='signup' component={Signup}/>	
				<Route path='signin' component={Signin}/>
				<Route path='signout' component={Signout}/>

				<Route path='404' component={NotFound404} />
				<Route path='*' component={NotFound404} />	
			</Route>		
		</Router>
	</Provider>,	

	document.getElementById("app")
);


