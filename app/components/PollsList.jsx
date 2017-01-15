import React, { Component } from 'react';
import PollsListItem from 'PollsListItem';
import Alert from 'Alert';

export default class PollsList extends Component{
	
	render (){		
		var {polls, title} = this.props;
		
		var renderPolls = () => {
			if(!polls){				
				return <div>Loading ...</div>
			}else{
				return polls.map((poll, i)=>{
					return <PollsListItem poll={poll} key={i} />;
				});
			}
		}				
		return(
			<div className="row">		
				<div className="col-md-3"></div>
					<div className="col-md-6">
						<Alert />
						<h1>{title}</h1>					
						{renderPolls()}	
					</div>
				<div className="col-md-3"></div>				
			</div>
		)
	}
}
