import {
  ADD_PROJECT_SUCCESS,
  FETCH_PROJECTS_START,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  collection: [],
  newProject: { id: 0, name: '' },
};

function projects(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        collection: state.collection.concat([action.project]),
      });

    case FETCH_PROJECTS_START:
      // PROJECT: Set UI status?
      return state;
    case FETCH_PROJECTS_SUCCESS:
      return Object.assign({}, state, {
        collection: action.projects,
      });
    case FETCH_PROJECTS_FAILURE:
      // PROJECT: Set UI Error message
      return state;
    default:
      return state;
  }
}

projects.INITIAL_STATE = INITIAL_STATE;

module.exports = projects;
