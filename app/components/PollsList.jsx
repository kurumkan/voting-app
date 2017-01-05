import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getPolls} from 'Actions';
import PollsListItem from 'PollsListItem';


class PollsList extends Component{

	constructor(props) {
		super(props);		
		this.state={
			error: ''
		}
	}

	componentWillMount() {
		var _this=this;	
		
		this.props.getPolls().then(
			(data)=>{
				//if ok - do nothing				
			},
			(error)=>{
				//in case of error - display a message
				_this.setState({
					error: 'Something went wrong. We are working on it.'
				})
			}
		)
	}

	render (){
		var {error} = this.state;		
		//if error occured in api.getPolls - then render the error message
		function renderError(){					
			if(error){				
				return (
					<div className="alert alert-danger" role="alert">
						{error}
					</div>
				)
			}		
		}
		
		const polls = this.props.polls.map((poll, i)=>{
			return <PollsListItem poll={poll} key={i} />;
		});

		return(
			<div className="row">		
				<div className="col-md-3"></div>
					<div className="col-md-6">
						{renderError()}
						<h1>Polls</h1>					
						{polls}				
					</div>
				<div className="col-md-3"></div>				
			</div>
		)
	}
}


function mapStateToProps(state) {
	return {
		polls: state.polls.all,
	};
}

export default connect(mapStateToProps, {getPolls})(PollsList);