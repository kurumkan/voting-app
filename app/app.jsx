import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

//Load bootstrap
require('style!css!bootstrap/dist/css/bootstrap.min.css');
// App css
require('style!css!sass!applicationStyles');


import Main from 'Main';
import PollsList from 'PollsList';
import NewPoll from 'NewPoll';
import MyPolls from 'MyPolls';



ReactDOM.render(
	<Router history={browserHistory}>	
		<Route path="/" component={Main}>	
			<IndexRoute component={PollsList} />		
		 	<Route path="polls" component={PollsList} /> 
			<Route path="polls/new" component={NewPoll} />			
			<Route path="polls/mypolls" component={MyPolls} />									
		</Route>		
	</Router>, 

	document.getElementById("app")
);


