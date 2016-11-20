import React from 'react';

class TaskListItem extends React.Component {
  render() {
  	return (
      <li className=''>
        { this.props.task.title }
      </li>
  	);
  }
}

module.exports = TaskListItem;
