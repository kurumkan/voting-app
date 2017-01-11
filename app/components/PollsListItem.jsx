import React, { Component } from 'react';
import {Link} from 'react-router';
import moment from 'moment';

export default class PollsListItem extends Component{
	
	render() {

		var {title, _id, created, author} = this.props.poll;						

		return (
			<div className="panel panel-default">		
				<div className="panel-body">
					<h3>								
						<Link to={"/polls/"+_id}>{title}</Link>									
					</h3>					
					<span className='text-right'>
						Created {moment(created).format('DD MMMM YYYY')} by {author}
					</span>
				</div>
			</div>		
		);	
	}
}
