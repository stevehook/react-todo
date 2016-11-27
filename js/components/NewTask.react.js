import React from 'react';
import ReactDOM from 'react-dom';

const ENTER_KEY = 13;

class NewTask extends React.Component {
  render() {
    return (
      <div id='new-task' className='task new-task'>
        <input
          className='form-control task-title'
          placeholder='What needs to be done?'
          autoFocus={ true }
          ref='newField'
          onKeyDown={ this.handleNewTaskKeyDown.bind(this) }
        />
      </div>
    );
  }

  handleNewTaskKeyDown(event) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    let input = ReactDOM.findDOMNode(this.refs.newField);
    let title = input.value.trim();

    if (title && this.props.onNewTask) {
      this.props.onNewTask(title);
      input.value = '';
    }
  }
}

NewTask.propTypes = {
  onNewTask: React.PropTypes.func
};

module.exports = NewTask;
