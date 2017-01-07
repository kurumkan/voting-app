import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getPolls} from 'Actions';
import PollsListItem from 'PollsListItem';

class PollsList extends Component{
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
	componentWillMount() {			
		this.props.getPolls();
	}

	render (){		
		var {polls} = this.props;
		
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
						<h1>Polls</h1>					
						{renderPolls()}	
					</div>
				<div className="col-md-3"></div>				
			</div>
		)
	}
}


function mapStateToProps(state) {
	return {
		polls: state.polls.all,
		errorMessage: state.error
	};
}

export default connect(mapStateToProps, {getPolls})(PollsList);