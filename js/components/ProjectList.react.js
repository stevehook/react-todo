import React from 'react';
import { connect } from 'react-redux';
import ProjectService from '../services/ProjectService';
import { fetchProjects } from '../actions/actionTypes';
import ProjectListItem from './ProjectListItem.react';

export const ProjectList = React.createClass({
  componentDidMount: function() {
    const { dispatch } = this.props;
    this.props.dispatch(fetchProjects());
  },

  render: function() {
    return (
      <div>
        <div><ul className='project-list'>{this.props.collection.map((project) => {
          return (
            <ProjectListItem key={'project-' + project.id} project={project}/>
          );
        })}</ul>
        </div>
      </div>
    );
  }
});

// Select state to inject given global state - just take it all for now
function select(state) {
  return state.data;
}

export default connect(state => state.data.projects)(ProjectList);

