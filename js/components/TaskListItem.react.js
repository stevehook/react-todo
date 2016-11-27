import React from 'react';

class TaskListItem extends React.Component {
  render() {
  	return (
      <li className={ this.cssClassForTask() }>
        <span className='glyphicon glyphicon-ok' onClick={ this.handleComplete.bind(this) }></span>
        <span>{this.props.task.title}</span>
        <span className='glyphicon glyphicon-remove' onClick={ this.handleArchive.bind(this) }></span>
      </li>
  	);
  }

  cssClassForTask() {
    return (
      this.props.task.completed ?
        'completed' :
        'pending'
    );
  }

  handleComplete() {
    if (this.props.onCompleteTask) {
      this.props.onCompleteTask(this.props.task.id);
    }
  }

  handleArchive() {
    if (this.props.onArchiveTask) {
      this.props.onArchiveTask(this.props.task.id);
    }
  }
}

TaskListItem.propTypes = {
  task: React.PropTypes.object.isRequired,
  onCompleteTask: React.PropTypes.func,
  onArchiveTask: React.PropTypes.func
};

module.exports = TaskListItem;
