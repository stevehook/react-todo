import React from 'react';
import { connect } from 'react-redux';
import ProjectService from '../services/ProjectService';
import { fetchProjects } from '../actions/actionTypes';
import ProjectListItem from './ProjectListItem.react';

class ProjectList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    this.props.dispatch(fetchProjects());
  }

  render() {
    return (
      <div>
        <div>
          <ul className='project-list'>{
            this.props.collection.map((project) => {
              console.log(project);
              return (
                <ProjectListItem key={'project-' + project.id} project={ project }/>
              );
            })
          }
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(state => state.data.projects)(ProjectList);
