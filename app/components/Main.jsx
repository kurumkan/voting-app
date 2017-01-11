import React, { Component } from 'react';
import Nav from 'Nav';

export default class Main extends Component{
	render() {
		return (
			<div className='container'>
				<Nav/>									
				{this.props.children}	
			</div>	
		);	
	}
}
