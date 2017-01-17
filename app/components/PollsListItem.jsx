import React, { Component } from 'react';
import {Link} from 'react-router';
import moment from 'moment';

export default class PollsListItem extends Component{
	
	render() {

		var {title, _id, created, author} = this.props.poll;						

		return (
			<Link to={"/polls/"+_id}>
				<div className="panel panel-default">		
					<div className="panel-body">
						<h3>								
							{title}
						</h3>									
					</div>							
					<div className='panel-footer'>
						Created {moment(created).format('DD MMMM YYYY')} by {author}
					</div>				
				</div>		
			</Link>	
		);	
	}
}
