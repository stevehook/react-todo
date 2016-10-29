const expect = require('chai').expect;
const request = require('superagent');
import * as actions from '../../js/actions/actionTypes';
import nock from 'nock';
import mockStore from '../mockStore';

describe('actions', () => {
  describe('addTask', () => {
    afterEach(() => { nock.cleanAll(); });
    const initialState = {
      data: {
        tasks: []
      },
      authentication: {
        loggedIn: false,
        user: null
      }
    };

    beforeEach(() => {
      window.sessionStorage.setItem('jwt', 'jwt123');
    });

    describe('when /api/tasks succeeds', () => {
      let responseBody = { id: 123, title: 'Walk the dog', completed: false };

      beforeEach(() => {
        nock('http://localhost')
          .post('/api/tasks')
          .matchHeader('Authorization', 'Bearer jwt123')
          .reply(200, responseBody, {'Content-Type': 'application/json'});
      });

      it('it dispatches the correct actions', (done) => {
        const expectedActions = [
          { type: actions.ADD_TASK_START },
          { type: actions.ADD_TASK_SUCCESS, task: responseBody }
        ];
        const store = mockStore(initialState, expectedActions, done);
        store.dispatch(actions.addTask('Walk the dog'));
      });
    });

    describe('when /api/tasks fails', () => {
      beforeEach(() => {
        nock('http://localhost')
          .post('/api/tasks')
          .matchHeader('Authorization', 'Bearer jwt123')
          .reply(400, {}, {'Content-Type': 'application/json'});
      });

      it('it dispatches the correct actions', (done) => {
        const expectedActions = [
          { type: actions.ADD_TASK_START },
          { type: actions.ADD_TASK_FAILURE, error: 'API Failed' }
        ];
        const store = mockStore(initialState, expectedActions, done);
        store.dispatch(actions.addTask('Walk the dog'));
      });
    });
  });
});

