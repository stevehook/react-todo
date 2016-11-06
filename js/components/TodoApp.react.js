import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import ProjectList from './ProjectList.react';
import LoginForm from './LoginForm.react';
import Home from './Home.react';
import AuthService from '../services/AuthService';
import { connect, Provider } from 'react-redux';
import { checkLoggedIn, login } from '../actions/actionTypes';

export const TodoApp = React.createClass({
  componentDidMount: function() {
    const { dispatch } = this.props;
    dispatch(checkLoggedIn());
  },

  handleLogin: function(email, password) {
    const { dispatch } = this.props;
    dispatch(login(email, password));
  },

  render: function() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Home}>
        <Route path="login" component={LoginForm}/>
        <Route path="projects" component={ProjectList}/>
        <Route path="*" component={Home}/>
        </Route>
      </Router>
    );
    // TODO: Use a generic component to handle this switch
    // if (this.props.authentication && this.props.authentication.loggedIn) {
    //   const store = this.props.store;
    //   return (
    //     <div>
    //       <Provider store={store}>
    //         <ProjectList/>
    //       </Provider>
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div>
    //       <LoginForm onLogin={this.handleLogin}/>
    //     </div>
    //   );
    // }
  }
});

TodoApp.propTypes = {
  store: PropTypes.object.isRequired
};

// Select state to inject given global state - just take it all for now
function select(state) {
  return state;
}

export default connect(select)(TodoApp);
