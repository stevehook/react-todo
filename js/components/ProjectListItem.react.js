import React from 'react';
import { Link } from 'react-router';

class ProjectListItem extends React.Component {
  render() {
  	return (
    <li className="">
      <Link to={`/projects/${this.props.project.id}/tasks`}>{ this.props.project.name }</Link>
    </li>
  	);
  }
}

module.exports = ProjectListItem;
