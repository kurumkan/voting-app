import React, { Component } from 'react';
import activeComponent from 'react-router-active-component';
import {connect} from 'react-redux';
import {IndexLink, Link} from 'react-router';

class Nav extends Component{	

	render() {
		var NavLink=activeComponent('li');
		return (
			<nav className="navbar navbar-inverse">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar">
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>      			
						<IndexLink className="navbar-brand" to="/">
							<span className="glyphicon glyphicon-star-empty" aria-hidden="true"></span> 
							Voting App
						</IndexLink>
						
					</div>
					<div className="collapse navbar-collapse" id="navbar">
						<ul className="nav navbar-nav">
							<NavLink to="/" onlyActiveOnIndex>Home</NavLink>							
							<NavLink to="/polls/mypolls">My Polls</NavLink>							
							<NavLink to="/polls/new">New Poll</NavLink>							
						</ul>
						<ul className="nav navbar-nav navbar-right">							
							<li className="dropdown">
								<a href="#" className="dropdown-toggle" 
									data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"
								>
									Michael Jackson <span className="caret"></span>
								</a>
								<ul className="dropdown-menu">
									<li>
										<button className='btn btn-danger btn-block' onClick={this.handleSignOut}>Sing out</button>										
									</li>								
								</ul>
							</li>
						</ul>
					</div>	
				</div>
			</nav>
		);		
	}
}	


function mapStateToProps(state){
	return { authenticated: state.auth.authenticated}
}

export default connect(mapStateToProps, null)(Nav);




