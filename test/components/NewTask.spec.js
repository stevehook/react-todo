import expect from 'expect';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import NewTask from '../../js/components/NewTask.react.js';

describe('NewTask.react', () => {
  let newTask, input;

  beforeEach(() => {
    newTask = undefined;
    let handleNewTask = (task) => {
      newTask = task;
    };

    let todoNewTask = TestUtils.renderIntoDocument(
      <NewTask onNewTask={handleNewTask}/>
    );
    input = TestUtils.findRenderedDOMComponentWithTag(todoNewTask, 'input');
  });

  it('renders an input element', () => {
    expect(input).toExist();
  });

  it('calls onNewTask handler when user presses enter key', () => {
    input.value = 'Walk the dog';
    TestUtils.Simulate.keyDown(input, { keyCode: 13 });
    expect(newTask).toExist();
    expect(newTask).toEqual('Walk the dog');
  });

  it('does not call onNewTask handler when user presses the ESC key', () => {
    input.value = 'Walk the dog';
    TestUtils.Simulate.keyDown(input, { keyCode: 27 });
    expect(newTask).toNotExist();
  });
});
