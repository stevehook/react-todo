import React from 'react';
import { connect } from 'react-redux';
import { fetchTasks, addTask, completeTask, archiveTask } from '../actions/actionTypes';
import TaskListItem from '../components/TaskListItem.react';
import NewTask from '../components/NewTask.react';

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleArchiveTask = this.handleArchiveTask.bind(this);
    this.handleCompleteTask = this.handleCompleteTask.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.props.dispatch(fetchTasks(this.props.params.projectId));
  }

  tasksForProject() {
    return this.props.collection.filter(
      task => task.project_id === parseInt(this.props.params.projectId)
    );
  }

  render() {
    return (
      <div>
        <NewTask task={this.props.newTask} onNewTask={this.handleNewTask} />
        <ul className="task-list">
          {this.tasksForProject().map(task =>
            <TaskListItem
              key={`task-${task.id}`}
              task={task}
              onArchiveTask={this.handleArchiveTask}
              onCompleteTask={this.handleCompleteTask}
            />
          )}
        </ul>
      </div>
    );
  }

  handleCompleteTask(taskId) {
    this.props.dispatch(completeTask(this.props.params.projectId, taskId));
  }

  handleArchiveTask(taskId) {
    this.props.dispatch(archiveTask(this.props.params.projectId, taskId));
  }

  handleNewTask(title) {
    this.props.dispatch(addTask(this.props.params.projectId, title));
  }
}

TaskList.propTypes = {};

export default connect(state => state.data.tasks)(TaskList);
