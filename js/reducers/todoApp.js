const authentication = require('./authentication');
const todos = require('./todos');
const projects = require('./projects');

const INITIAL_STATE = {
  authentication: authentication.INITIAL_STATE,
  data: projects.INITIAL_STATE
};

function todoApp(state = INITIAL_STATE, action) {
  return {
    data: projects(state.data, action),
    authentication: authentication(state.authentication, action)
  }
};

todoApp.INITIAL_STATE = INITIAL_STATE;

module.exports = todoApp;
