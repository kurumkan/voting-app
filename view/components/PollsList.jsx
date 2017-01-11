import React, { Component } from 'react';
import PollsListItem from 'PollsListItem';

export default class PollsList extends Component{
	
	renderAlert(){		
		var {errorMessage} = this.props;
		if(errorMessage){
			return (
				<div className='alert alert-danger'>
					<strong>Oops!</strong> {errorMessage}
				</div>
			)
		}
	}	

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
						{this.renderAlert()}
						<h1>{title}</h1>					
						{renderPolls()}	
					</div>
				<div className="col-md-3"></div>				
			</div>
		)
	}
}
