import React from 'react';

class TaskListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
  }

  render() {
  	return (
    <li className={this.cssClassForTask()}>
      <span className="glyphicon glyphicon-ok" onClick={this.handleComplete} />
      <span>{this.props.task.title}</span>
      <span className="glyphicon glyphicon-remove" onClick={this.handleArchive} />
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
  onArchiveTask: React.PropTypes.func,
};

module.exports = TaskListItem;
