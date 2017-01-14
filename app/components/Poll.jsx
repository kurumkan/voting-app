import React, { Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import {Doughnut} from 'react-chartjs-2'

import {getRandomColor} from 'utils';
import {getSinglePoll, deletePoll, updatePoll} from 'Actions';


class Poll extends Component{
	constructor(props) {
		super(props);
		this.state = {			
			inputValue: '',
			selectValue: 0,
			showTextInput: false
		};
		this.handleDelete=this.handleDelete.bind(this);
		this.handleChange=this.handleChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
	}

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

	componentWillMount(){		
		var id = this.props.params.id;	

		this.props.getSinglePoll(id);			
	}

	handleDelete(e){				
		this.props.deletePoll(this.props.params.id);					
	}

	handleChange(key){

		return function(e){
			var value = e.target.value;
			if(key=='inputValue'){
				this.setState({
					inputValue: value
				})
			}else{								
				var showTextInput=false;
				
				if(value=='newOption'){
					showTextInput=true;							
				}

				this.setState({
					selectValue: value,
					showTextInput: showTextInput,
					inputValue: ''
				});				
			}

		}.bind(this);		
	}

	handleSubmit (e){
		e.preventDefault();			
		var newLabel = this.state.inputValue;
		var {poll} = this.props;
		var id = poll._id;
		if(newLabel){
			var index=-1;
			poll.options.map((option, i)=>{
				if(option.label==newLabel)
					index=i;				
				return option;
			})
			if(index>=0){
				poll.options[index].count += 1;				
			}else{
				var newOption = {
					label: newLabel,
					count: 1,
					backgroundColor: getRandomColor()
				};		
				poll.options.push(newOption);	
			}			
		}else{
			var {selectValue}=this.state;
			var index=+selectValue;
			poll.options[index].count += 1;			
		}		

		this.setState({				
				inputValue: '',
				selectValue: 0,
				showTextInput: false
			},()=>{											
				this.refs.chart.chart_instance.update();	
				this.props.updatePoll(id, poll);
		});
	}

	render(){	
	    var {poll, authenticated, userid} = this.props;		    

		if(!poll)
			return <h3 className="text-center">Loading ...</h3>;
		
		var {options, title, _id} = poll;				


		var labels = options.map((option)=>option.label);
		var backgroundColor = options.map((option)=>option.backgroundColor);
		var data = options.map((option)=>option.count);
		
		var data = {
			labels: labels,
			datasets: [{
				backgroundColor: backgroundColor,
				data: data
			}]
		};				
		var options = {
			title: {
				display: true,
				text: title
			},
			cutoutPercentage: 40
		};


		var renderTextInput = ()=> {
			if(this.state.showTextInput)
				return (
					<div className='form-group'>
						<input 
							value={this.state.inputValue} 
							onChange={this.handleChange('inputValue')} 
							type='text'
							className='form-control'
							placeholder='New Option ...' 							
							required
						/>
					</div>	
				);				
		};

		var renderForm = () => {
			return (
				<form onSubmit={this.handleSubmit}>
					<div className='form-group'>					
						Seleact an option
						<select 
							value={this.state.selectValue} 
							onChange={this.handleChange('selectValue')}
							className='form-control'
						>
							{
								labels.map((label, i)=>{
									return (
										<option value={i} key={i}>{label}</option>			
									)
								})
							}		
							{
								authenticated&&(<option value='newOption'>I would like a custom option</option>)
							}
						</select>						
					</div>	
					{authenticated&&renderTextInput()}
					<button type="submit" className='btn btn-success'>Vote</button>					
				</form>	
			);			
		};	
		
		return (
			<div className="row">		
				<div className="col-md-3"></div>
				<div className="col-md-6">
					{this.renderAlert()}
					<div className="panel panel-default">
						<div className="panel-body">
							<div>
								<Doughnut	
									ref='chart'							    
								    data={data}
								    width={1000}
								    height={1000}								    
								    options={options}										        
								/>
							</div>
							<div>
								{renderForm()}
							</div>
						</div>
						{
							authenticated&&userid==poll.author.id&&(<div className="panel-footer text-right">							
								<button className="btn btn-danger" onClick={this.handleDelete} >Delete</button>							
							</div>)
						}
					</div>	
				</div>
				<div className="col-md-3"></div> 		
			</div>
		);
	}


}

Poll.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return {
		poll: state.polls.poll,    
		errorMessage: state.error,
		authenticated: state.auth.authenticated,
		userid: state.auth.userid
	};
}

export default connect(mapStateToProps, { getSinglePoll, deletePoll, updatePoll })(Poll);




