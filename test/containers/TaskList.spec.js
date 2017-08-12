import expect from 'expect';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import TaskList from '../../js/containers/TaskList.react';
import TaskListItem from '../../js/components/TaskListItem.react';
import * as Actions from '../../js/actions/actionTypes';

let tasks = [
  { id: 123, project_id: 123, title: 'Walk the dog' },
  { id: 456, project_id: 123, title: 'Make dinner' },
  { id: 789, project_id: 123, title: 'Vaccuum the carpet' },
  { id: 567, project_id: 234, title: 'Learn Elixir' },
  { id: 234, project_id: 234, title: 'Learn Node.js' },
  { id: 890, project_id: 345, title: 'Mow the lawn' }
];

let initialState = {
  authentication: {
    loggedIn: true,
    user: null
  },
  data: {
    tasks: {
      newTask: {},
      collection: tasks
    }
  }
};

let params = {
  projectId: 123
}

describe('TaskList.react', () => {
  let instance;

  beforeEach(() => {
    let store = createStore(state => state, initialState);
    expect.spyOn(Actions, 'fetchTasks').andCall(() => {
      return { type: Actions.FETCH_TASKS_SUCCESS, tasks: tasks };
    });

    instance = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <TaskList params={ params } />
      </Provider>
    );
  });

  afterEach(() => {
    expect.restoreSpies();
  });

  it('renders a TaskListItem component for each project', () => {
    let taskListItems = TestUtils.scryRenderedComponentsWithType(instance, TaskListItem);
    expect(taskListItems.length).toEqual(3);
    let ul = TestUtils.findRenderedDOMComponentWithTag(instance, 'ul');
    expect(ul.textContent).toMatch('Walk the dog');
    expect(ul.textContent).toNotMatch('Mow the lawn');
  });
});
