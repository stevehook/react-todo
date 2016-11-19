import React from 'react';

const TaskListItem = React.createClass({
  render: () => {
  	return (
      <li className=''>
        { this.props.task.name }
      </li>
  	);
  }
});

module.exports = TaskListItem;
