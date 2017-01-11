import React, { Component } from 'react';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import * as actions from 'Actions';


class Signup extends Component {
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

  handleFormSubmit({username, email, password}){
    this.props.signupUser({username, email, password});    
  }

  render() {
    var {handleSubmit, fields:{username, email, password, passwordConfirm}} = this.props;   
    
    return (
      <div className="row">
        <h1 className="text-center">Create a New Account</h1>
        <div className="col-md-3"></div>
        <div className="col-md-6">    
          {this.renderAlert()}
          <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
            <div className="form-group">
              <label htmlFor="username">Username:</label>             
              <input 
                id="username"
                className="form-control" placeholder="Username" 
                {...username}
              />
              {(username.error&&username.touched)&&<div className='text-danger'>{username.error}</div>}
            </div>            
            <div className="form-group">
              <label htmlFor="email">Email:</label>             
              <input 
                id="email"
                className="form-control" placeholder="Email" 
                {...email}
              />
              {(email.error&&email.touched)&&<div className='text-danger'>{email.error}</div>}
            </div>           
            <div className="form-group">
              <label htmlFor="password">Password:</label>             
              <input 
                id="password"
                className="form-control" type="password" 
                {...password}
              />
              {(password.error&&password.touched)&&<div className='text-danger'>{password.error}</div>}
            </div>           
            <div className="form-group">
              <label htmlFor="passwordConfirm">Confirm Password:</label>             
              <input 
                id="passwordConfirm"
                className="form-control" type="password" 
                {...passwordConfirm}
              />
              {(passwordConfirm.error&&passwordConfirm.touched)&&<div className='text-danger'>{passwordConfirm.error}</div>}
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

  if(!fromProps.username){
    errors.username = 'Please enter an username';
  }

  if(!fromProps.email){
    errors.email = 'Please enter an email';
  }

  if(!fromProps.password){
    errors.password = 'Please enter a password';
  }

  if(!fromProps.passwordConfirm){
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if(fromProps.password!==fromProps.passwordConfirm){
    errors.password='Passwords must match!';
  } 

  return errors;
}

function mapStateToProps(state){
  return {errorMessage: state.error}
}

export default reduxForm({
  form: 'signup',
  fields: ['username', 'email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);