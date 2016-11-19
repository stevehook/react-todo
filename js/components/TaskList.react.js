import React from 'react';
import { connect } from 'react-redux';
import { fetchTasks } from '../actions/actionTypes';
import TaskListItem from './TaskListItem.react';

class TaskList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    this.props.dispatch(fetchTasks(this.props.params.projectId));
  }

  render() {
    return (
      <div>
        <div><ul className='task-list'>{this.props.collection.map((task) => {
          return (
            <TaskListItem key={'task-' + task.id} task={task}/>
          );
        })}</ul>
        </div>
      </div>
    );
  }
}

export default connect(state => state.data.tasks)(TaskList);
