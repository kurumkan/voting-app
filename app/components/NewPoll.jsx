import React, { Component } from 'react';
import {reduxForm} from 'redux-form';
import {Link} from 'react-router';

import * as actions from 'Actions';

class NewPoll extends Component{
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

	handleFormSubmit({title, options}){
		this.props.createPoll({title,options});
	}

	render() {
		var {handleSubmit, fields:{title, options}} = this.props;    

		return (
			<div className="row">
				<h1 className="text-center">Make a New Poll</h1>
				<div className="col-md-3"></div>
				<div className="col-md-6">		
					<form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
						<div className="form-group">
							<label htmlFor="title">Title:</label>							
							<input 
								className="form-control" placeholder="Your Poll Title" 
								{...title}
							/>
							{(title.error&&title.touched)&&<div className='text-danger'>* {title.error}</div>}
						</div>						
						<div className="form-group">
							<label htmlFor="options">Options</label>
			  				<textarea 			  					
			  					className="form-control" placeholder="Type each option on a new line"  
			  					{...options}
			  				/>
			  				{(options.error&&options.touched)&&<div className='text-danger'>* {options.error}</div>}
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

function validate(fromProps){
	var errors = {}; 

	if(!fromProps.title){
		errors.title = 'Please enter a title';
	}

	if(!fromProps.options){
		errors.options = 'Please enter some options';
	}

	return errors;
}

function mapStateToProps(state){
  	return {errorMessage: state.error}
}

export default reduxForm({
	form: 'newpoll',
	fields: ['title', 'options'],
	validate: validate
}, mapStateToProps, actions)(NewPoll);