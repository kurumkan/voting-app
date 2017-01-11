import React, { Component } from 'react';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import * as actions from 'Actions';


class Signin extends Component {
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

  handleFormSubmit({login, password}){
    this.props.signinUser({login, password});    
  }

  render() {
    var {handleSubmit, fields:{login, password}} = this.props;    
    return (
      <div className="row">
        <h1 className="text-center">Sign In</h1>
        <div className="col-md-3"></div>
        <div className="col-md-6">    
          {this.renderAlert()}
          <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
            <div className="form-group">
              <label htmlFor="login">Email or Username:</label>             
              <input 
                id="login"
                className="form-control" placeholder="Email or Username" 
                {...login}
              />
              {(login.error&&login.touched)&&<div className='text-danger'>{login.error}</div>}  
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
            <button type="submit" className="btn btn-success">Submit</button>           
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

  if(!fromProps.login){
    errors.login = 'Please enter a username or an email';
  }

  if(!fromProps.password){
    errors.password = 'Please enter a password';
  }

  return errors;
}

function mapStateToProps(state){
  return {errorMessage: state.error}
}

export default reduxForm({
  form: 'signin',
  fields: ['login', 'password'],
  validate
}, mapStateToProps, actions)(Signin);