const expect = require('chai').expect;
const request = require('superagent');
import * as actions from '../../js/actions/actionTypes';
import nock from 'nock';
import mockStore from '../mockStore';

describe('actions', () => {
  describe('fetchProjects', () => {
    afterEach(() => { nock.cleanAll(); });
    const initialState = {
      data: {
        projects: []
      },
      authentication: {
        loggedIn: false,
        user: null
      }
    };

    beforeEach(() => {
      window.sessionStorage.setItem('jwt', 'jwt123');
    });

    describe('when /api/projects succeeds', () => {
      let responseBody = [{ id: 123, title: 'Walk the dog' }];

      beforeEach(() => {
        nock('http://localhost')
          .get('/api/projects')
          .matchHeader('Authorization', 'Bearer jwt123')
          .reply(200, responseBody, {'Content-Type': 'application/json'});
      });

      it('it dispatches the correct actions', (done) => {
        const expectedActions = [
          { type: actions.FETCH_PROJECTS_START },
          { type: actions.FETCH_PROJECTS_SUCCESS, projects: responseBody }
        ];
        const store = mockStore(initialState, expectedActions, done);
        store.dispatch(actions.fetchProjects());
      });

      describe('when JWT is not set', () => {
        beforeEach(() => {
          window.sessionStorage.removeItem('jwt');
        });

        it('it dispatches the correct actions', (done) => {
          const expectedActions = [
            { type: actions.FETCH_PROJECTS_START },
            { type: actions.FETCH_PROJECTS_FAILURE, error: 'API Failed' }
          ];
          const store = mockStore(initialState, expectedActions, done);
          store.dispatch(actions.fetchProjects());
        });
      });
    });

    describe('when /api/projects fails', () => {
      beforeEach(() => {
        nock('http://localhost')
          .get('/api/projects')
          .matchHeader('Authorization', 'Bearer jwt123')
          .reply(400, {}, {'Content-Type': 'application/json'});
      });

      it('it dispatches the correct actions', (done) => {
        const expectedActions = [
          { type: actions.FETCH_PROJECTS_START },
          { type: actions.FETCH_PROJECTS_FAILURE, error: 'API Failed' }
        ];
        const store = mockStore(initialState, expectedActions, done);
        store.dispatch(actions.fetchProjects());
      });
    });
  });
});
