const authentication = require('./authentication');
const tasks = require('./tasks');
const projects = require('./projects');

const INITIAL_STATE = {
  data: {
    projects: projects.INITIAL_STATE,
    tasks: tasks.INITIAL_STATE,
  },
  authentication: authentication.INITIAL_STATE,
};

function todoApp(state = INITIAL_STATE, action) {
  return {
    data: {
      projects: projects(state.data ? state.data.projects : undefined, action),
      tasks: tasks(state.data ? state.data.tasks : undefined, action),
    },
    authentication: authentication(state.authentication, action),
  };
}

todoApp.INITIAL_STATE = INITIAL_STATE;

module.exports = todoApp;
