import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';

import {createPoll} from 'Actions';

class NewPoll extends Component{	

	constructor(props) {
		super(props);

		this.state = {
			title: "",
			options: []
		}

		this.handleSubmit = this.handleSubmit.bind(this);				
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
		var {title, options} = this.state;				

		if(title&&options){				

			var poll={
				title,
				options
			};			
			
			var _this = this;
			
			this.props.createPoll(poll)
				.then(function(result){		
					var {id} = result.payload.data;					
					_this.context.router.replace('/polls/'+id);
				}, function(error){									
					_this.context.router.replace('/')
				});			
		}		
	}

	handleChange(key){
		return function (e) {
			var state = {};
			state[key] = e.target.value;
			this.setState(state);
	    }.bind(this);
	}

	render() {
		var {title, options} = this.state;
				
		return (
			<div className="row">
				<h1 className="text-center">Make a New Poll</h1>
				<div className="col-md-3"></div>
				<div className="col-md-6">		
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="title">Title:</label>
							<input 
								value={title} onChange={this.handleChange('title')} 
								type="text" name="title" className="form-control" id="title" 
								required placeholder="Your Poll Title" 
							/>
						</div>						
						<div className="form-group">
							<label htmlFor="options">Options</label>
			  				<textarea 
			  					value={options} onChange={this.handleChange('options')} 
			  					className="form-control" name="options" rows="5" id="options" 
			  					required placeholder="Type each option on a new line"  
			  				/>
						</div>			
						<button type="submit" className="btn btn-success">Save</button>						
						<Link to="/" className="btn btn-default">Cancel</Link>			
					</form>
				</div>
				<div className="col-md-3"></div>
			</div>
		);
	}
}

NewPoll.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch){
	return bindActionCreators({createPoll}, dispatch)
}

export default connect(null, mapDispatchToProps)(NewPoll)