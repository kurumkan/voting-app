import React, { Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import {Doughnut} from 'react-chartjs-2'

import {getRandomColor} from 'utils';
import {getSinglePoll, deletePoll, updatePoll} from 'Actions';
import Alert from 'Alert';


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
			//if change was on the input field
			if(key=='inputValue'){				
				this.setState({
					inputValue: value
				})
			}else{
			//if change was on select element									
				var showTextInput=false;
				
				//if selected element was 'I would like a custom option'
				if(value=='newOption'){
					showTextInput=true;							
				}

				this.setState({
					selectValue: value,
					showTextInput,
					inputValue: ''
				});				
			}

		}.bind(this);		
	}

	handleSubmit (e){
		e.preventDefault();			
		var newLabel = this.state.inputValue;
		var originalPoll = this.props.poll;
		
		//clone the original poll
		var poll = JSON.parse(JSON.stringify(originalPoll));

		var id = poll._id;

		//if the custom option was selected
		if(newLabel){

			var index=-1;
			poll.options.map((option, i)=>{
				if(option.label==newLabel)
					index=i;				
				return option;
			})
			//if the new option already in the list
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
		//otherwise just increment count	
			var {selectValue}=this.state;
			var index=+selectValue;
			poll.options[index].count += 1;			
		}		
		
		this.setState({				
				inputValue: '',
				selectValue: 0,
				showTextInput: false				
			},()=>{															
				this.props.updatePoll(id, originalPoll, poll);
				this.refs.chart.chart_instance.update();									
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
					{
						authenticated&&userid==poll.author.id&&(<div className="pull-right">							
							<button className="btn btn-danger" onClick={this.handleDelete} >Delete</button>							
						</div>)
					}			
				</form>	
			);			
		};	
		
		return (
			<div className="row">		
				<div className="col-md-3"></div>
				<div className="col-md-6">
					<Alert />
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
						</div>
						<div className='panel-footer'>
							{renderForm()}							
						</div>						
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
		authenticated: state.auth.authenticated,
		userid: state.auth.userid
	};
}

export default connect(mapStateToProps, { getSinglePoll, deletePoll, updatePoll })(Poll);




