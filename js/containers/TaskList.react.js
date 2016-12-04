import React from 'react';
import { connect } from 'react-redux';
import { fetchTasks, addTask, completeTask, archiveTask } from '../actions/actionTypes';
import TaskListItem from '../components/TaskListItem.react';
import NewTask from '../components/NewTask.react';

class TaskList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    this.props.dispatch(fetchTasks(this.props.params.projectId));
  }

  tasksForProject() {
    return this.props.collection.filter(task => task.project_id === parseInt(this.props.params.projectId));
  }

  render() {
    return (
      <div>
        <NewTask task={ this.props.newTask } onNewTask={ this.handleNewTask.bind(this) } />
        <ul className='task-list'>{ this.tasksForProject.bind(this)().map((task) => {
          return (
            <TaskListItem
              key={ 'task-' + task.id }
              task={ task }
              onArchiveTask={ this.handleArchiveTask.bind(this) }
              onCompleteTask={ this.handleCompleteTask.bind(this) }
            />
          );
        })}
        </ul>
      </div>
    );
  }

  handleCompleteTask(taskId) {
    this.props.dispatch(completeTask(taskId));
  }

  handleArchiveTask(taskId) {
    this.props.dispatch(archiveTask(taskId));
  }

  handleNewTask(title) {
    this.props.dispatch(addTask(this.props.params.projectId, title));
  }
}

TaskList.propTypes = {
};

export default connect(state => state.data.tasks)(TaskList);
