import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getPolls} from 'Actions';
import PollsList from 'PollsList';

class IndexPage extends Component{

	componentWillMount() {			
		this.props.getPolls();
	}

	render (){		
		var {polls, errorMessage} = this.props;		
		
		return(
			<PollsList polls={polls} errorMessage={errorMessage} title={'Polls'} />
		);
	}
}

function mapStateToProps(state) {
	return {
		polls: state.polls.all,
		errorMessage: state.error
	};
}

export default connect(mapStateToProps, {getPolls})(IndexPage);