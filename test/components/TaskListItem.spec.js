import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TaskListItem from '../../js/components/TaskListItem.react';

let task = {
  id: 123,
  project_id: 123,
  title: 'Walk the dog'
};

describe('TaskListItem.react', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <TaskListItem task={ task } />
    );
  });

  it('renders the task title', () => {
    let li = TestUtils.findRenderedDOMComponentWithTag(instance, 'li');
    expect(li.textContent).toMatch('Walk the dog');
  });
});
