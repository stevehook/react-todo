const expect = require('chai').expect;
const todoApp = require('../../js/reducers/todoApp');

describe('todoApp UNKNOWN ACTION', () => {
  it('returns the initial state', () => {
    let newState = todoApp(undefined, {
      type: 'UNKNOWN'
    });
    expect(newState).to.eql(todoApp.INITIAL_STATE);
  });
});

describe('Adding projects', () => {
  const initialState = {
    data: {
      projects: {
        collection: [ { id: 123, name: 'Housework' } ],
        newProject: { id: 0, name: '' }
      }
    },
    authentication: {
      loggedIn: true,
      user: { id: 123, name: 'Bob' }
    }
  };

  describe('todoApp ADD_PROJECT_SUCCESS', () => {
    it('adds a new project', () => {
      let newState = todoApp(initialState, {
        type: 'ADD_PROJECT_SUCCESS',
        project: { id: 456, name: 'Gardening' }
      });
      expect(newState.data.projects).to.eql({
        collection: [
          { id: 123, name: 'Housework' },
          { id: 456, name: 'Gardening' }
        ],
        newProject: { id: 0, name: '' }
      });
    });
  });

  describe('todoApp ADD_PROJECT', () => {
    it('adding a project is asynchronous so does not add a project straight away', () => {
      let newState = todoApp(initialState, {
        type: 'ADD_PROJECT',
        name: 'Housework'
      });
      expect(newState.data.projects).to.eql(initialState.data.projects);
    });
  });
  describe('todoApp ADD_PROJECT_FAILURE', () => {
    it('does not change state', () => {
      let newState = todoApp(initialState, {
        type: 'ADD_PROJECT_FAILURE',
        error: 'Server on fire'
      });
      expect(newState.data.projects).to.eql(initialState.data.projects);
    });
  });
  describe('todoApp ADD_PROJECT_START', () => {
    it('does not change state', () => {
      let newState = todoApp(initialState, {
        type: 'ADD_PROJECT_START'
      });
      expect(newState.data.projects).to.eql(initialState.data.projects);
    });
  });
});

describe('todoApp FETCH_PROJECTS_SUCCESS', () => {
  let projects = [
    { id: 123, name: 'Housework' },
    { id: 456, name: 'Gardening' },
    { id: 789, name: 'Shopping' }
  ];

  it('adds a new project', () => {
    let newState = todoApp(undefined, {
      type: 'FETCH_PROJECTS_SUCCESS',
      projects: projects
    });
    expect(newState.data.projects).to.eql({
      collection: projects,
      newProject: { id: 0, name: '' }
    });
  });
});
