import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ProjectList from '../../js/components/ProjectList.react';
import ProjectListItem from '../../js/components/ProjectListItem.react';
import ProjectService from '../../js/services/ProjectService';
import * as Actions from '../../js/actions/actionTypes';

let projects = [
  { id: 123, name: 'Housework' },
  { id: 456, name: 'DIY' },
  { id: 789, name: 'Study' }
];

let initialState = {
  authentication: {
    loggedIn: true,
    user: null
  },
  data: {
    projects: {
      newProject: {},
      collection: projects
    }
  }
};

describe('ProjectList.react', () => {
  let instance;

  beforeEach(() => {
    let store = createStore(state => state, initialState);
    expect.spyOn(Actions, 'fetchProjects').andCall(() => {
      return { type: Actions.FETCH_PROJECTS_SUCCESS, projects: projects };
    });

    instance = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <ProjectList />
      </Provider>
    );
  });

  afterEach(() => {
    expect.restoreSpies();
  });

  it('renders a ProjectListItem component for each project', () => {
    let projectListItems = TestUtils.scryRenderedComponentsWithType(instance, ProjectListItem);
    expect(projectListItems.length).toEqual(3);
  });
});
