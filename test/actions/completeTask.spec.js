const expect = require('chai').expect;
const request = require('superagent');
import * as actions from '../../js/actions/actionTypes';
import nock from 'nock';
import mockStore from '../mockStore';

describe('actions', () => {
  describe('completeTask', () => {
    afterEach(() => { nock.cleanAll(); });
    const initialState = {
      data: {
        tasks: [
          { project_id: 321, id: 123, title: 'Cook dinner', completed: false },
          { project_id: 321, id: 456, title: 'Feed the kids', completed: false },
          { project_id: 321, id: 789, title: 'Feed the wife', completed: false }
        ]
      },
      authentication: {
        loggedIn: false,
        user: null
      }
    };

    beforeEach(() => {
      window.sessionStorage.setItem('jwt', 'jwt123');
    });

    describe('when /api/project/:projectId/tasks succeeds', () => {
      let responseBody = { id: 123, title: 'Cook dinner', completed: true };

      beforeEach(() => {
        nock('http://localhost')
          .post('/api/projects/321/tasks/123/complete')
          .matchHeader('authorization', 'Bearer jwt123')
          .reply(200, responseBody, {'Content-Type': 'application/json'});
      });

      it('it dispatches the correct actions', (done) => {
        const expectedActions = [
          { type: actions.COMPLETE_TASK_START },
          { type: actions.COMPLETE_TASK_SUCCESS, task: responseBody }
        ];
        const store = mockStore(initialState, expectedActions, done);
        store.dispatch(actions.completeTask(321, 123));
      });
    });

    describe('when /api/project/:project_id/tasks fails', () => {
      beforeEach(() => {
        nock('http://localhost')
          .post('/api/projects/321/tasks/123/complete')
          .matchHeader('authorization', 'Bearer jwt123')
          .reply(400, {}, {'Content-Type': 'application/json'});
      });

      it('it dispatches the correct actions', (done) => {
        const expectedActions = [
          { type: actions.COMPLETE_TASK_START },
          { type: actions.COMPLETE_TASK_FAILURE, error: 'API Failed' }
        ];
        const store = mockStore(initialState, expectedActions, done);
        store.dispatch(actions.completeTask(321, 123));
      });
    });
  });
});
