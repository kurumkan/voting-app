//hight order component to make sure the user logged in 
import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class RequireAuth extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {    	
      if (!this.props.authenticated) {
        this.context.router.push('/signin');
      }
    }

    componentWillUpdate(nextProps) {    	
      if (!nextProps.authenticated) {
        this.context.router.push('/signin');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(RequireAuth);
}
