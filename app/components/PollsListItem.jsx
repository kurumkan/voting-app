import React, { Component } from 'react';
import {Link} from 'react-router';

export default class PollsListItem extends Component{
	
	render() {

		var {title, _id} = this.props.poll;				

		return (
			<div className="panel panel-default">		
				<div className="panel-body">
					<h3>								
						<Link to={"/polls/"+_id}>{title}</Link>			
					</h3>					
				</div>
			</div>		
		);	
	}
}
