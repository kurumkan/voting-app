import React, { Component } from 'react';
import activeComponent from 'react-router-active-component';
import {connect} from 'react-redux';
import {IndexLink, Link} from 'react-router';

class Nav extends Component{	

	renderLinks(){
		var {authenticated} = this.props;
		var NavLink=activeComponent('li');
		if(authenticated){
			return (
				<div className="collapse navbar-collapse" id="navbar">
					<ul className="nav navbar-nav">
						<NavLink to="/" onlyActiveOnIndex>Home</NavLink>							
						<NavLink to="/mypolls">My Polls</NavLink>							
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
									<Link to='/signout' className='btn btn-danger btn-block'>Sing Out</Link>																	
								</li>								
							</ul>
						</li>
					</ul>
				</div>	
			)
		}else{
			return (
				<div className="collapse navbar-collapse" id="navbar">
					<ul className="nav navbar-nav">
						<NavLink to="/" onlyActiveOnIndex>Home</NavLink>												
					</ul>
					<ul className="nav navbar-nav navbar-right">							
						<NavLink to="/signin">Sign In</NavLink>							
						<NavLink to="/signup">Sign Up</NavLink>							
					</ul>
				</div>	
			);
		}
	}

	render() {		
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
					{this.renderLinks()}					
				</div>
			</nav>
		);		
	}
}	

function mapStateToProps(state){
	return { authenticated: state.auth.authenticated}
}

export default connect(mapStateToProps, null)(Nav);




