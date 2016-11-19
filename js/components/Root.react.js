import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import ProjectList from './ProjectList.react';
import TaskList from './TaskList.react';
import LoginForm from './LoginForm.react';
import Home from './Home.react';
import Authenticated from './Authenticated.react';
import NotFound from './NotFound.react';
import AuthService from '../services/AuthService';
import { connect, Provider } from 'react-redux';
import { checkLoggedIn, login } from '../actions/actionTypes';

const Root = React.createClass({
  render: function() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Home}>
          <Route path="login" component={LoginForm}/>
          <Route path="projects" component={Authenticated(ProjectList)}/>
          <Route path="projects/:projectId/tasks" component={Authenticated(TaskList)}/>
          <Route path="*" component={NotFound}/>
        </Route>
      </Router>
    );
  }
});

module.exports = Root;
