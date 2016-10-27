const authentication = require('./authentication');
const todos = require('./todos');
const projects = require('./projects');

const INITIAL_STATE = {
  data: {
    projects: projects.INITIAL_STATE,
    tasks: todos.INITIAL_STATE
  },
  authentication: authentication.INITIAL_STATE
};

function todoApp(state = INITIAL_STATE, action) {
  return {
    data: {
      projects: projects(state.data ? state.data.projects : undefined, action),
      tasks: todos(state.data ? state.data.tasks : undefined, action)
    },
    authentication: authentication(state.authentication, action)
  }
};

todoApp.INITIAL_STATE = INITIAL_STATE;

module.exports = todoApp;
