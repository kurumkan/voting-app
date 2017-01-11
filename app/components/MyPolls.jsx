import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getUserPolls} from 'Actions';
import PollsList from 'PollsList';

class MyPolls extends Component{

	componentWillMount() {				
		this.props.getUserPolls();		
	}

	render (){			
		var {polls, errorMessage} = this.props;				
		return(
			<PollsList polls={polls} errorMessage={errorMessage} title={'My Polls'} />
		);
	}
}

function mapStateToProps(state) {
	return {
		polls: state.polls.userpolls,
		errorMessage: state.error
	};
}

export default connect(mapStateToProps, {getUserPolls})(MyPolls);