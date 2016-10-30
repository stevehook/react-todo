const expect = require('chai').expect;
const request = require('superagent');
import * as actions from '../../js/actions/actionTypes';
import nock from 'nock';
const mockStore = require('../mockStore');
const todoApp = require('../../js/reducers/todoApp');

describe('actions', () => {
  describe('checkLoggedIn', () => {
    afterEach(() => { nock.cleanAll(); });
    const initialState = todoApp.INITIAL_STATE;

    describe('when GET /api/session succeeds', () => {
      describe('when JWT is set', () => {
        let responseBody = { user: { id: 123, name: 'Bob' }, jwt: 'jwt123' };

        beforeEach(() => {
          window.sessionStorage.setItem('jwt', 'jwt123');
          nock('http://localhost')
            .get('/api/session')
            .matchHeader('authorization', 'Bearer jwt123')
            .reply(200, responseBody, {'Content-Type': 'application/json'});
        });

        it('it dispatches the correct actions and sets the JWT token in sessionStorage', (done) => {
          const expectedActions = [
            { type: actions.CHECK_LOGGED_IN_START },
            { type: actions.CHECK_LOGGED_IN_SUCCESS, user: responseBody }
          ];
          const store = mockStore(initialState, expectedActions, (e) => {
            if (!e) {
              expect(window.sessionStorage.getItem('jwt')).to.eql('jwt123');
            }
            done(e);
          });
          store.dispatch(actions.checkLoggedIn());
        });
      });

      describe('when JWT is NOT set', () => {
        beforeEach(() => {
          window.sessionStorage.removeItem('jwt');
        });

        it('does not call API', (done) => {
          const expectedActions = [
            { type: actions.CHECK_LOGGED_IN_START },
            { type: actions.CHECK_LOGGED_IN_FAILURE, error: 'Login Failed' }
          ];
          const store = mockStore(initialState, expectedActions, () =>
          {
            expect(window.sessionStorage.getItem('jwt')).to.eql(null);
            done();
          });
          store.dispatch(actions.login());
        });
      });
    });
  });

  describe('login', () => {
    afterEach(() => { nock.cleanAll(); });
    const initialState = todoApp.INITIAL_STATE;

    describe('when POST /api/sessions succeeds', () => {
      let responseBody = { user: { id: 123, name: 'Bob' }, jwt: 'jwt123' };

      beforeEach(() => {
        nock('http://localhost')
          .post('/api/sessions')
          .reply(200, responseBody, {'Content-Type': 'application/json'});
        window.sessionStorage.setItem('jwt', null);
      });

      it('it dispatches the correct actions and sets the JWT token in sessionStorage', (done) => {
        const expectedActions = [
          { type: actions.LOGIN_START },
          { type: actions.LOGIN_SUCCESS, user: responseBody }
        ];
        const store = mockStore(initialState, expectedActions, () =>
        {
          expect(window.sessionStorage.getItem('jwt')).to.eql('jwt123');
          done();
        });
        store.dispatch(actions.login());
      });
    });

    describe('when POST /api/sessions fails', () => {
      beforeEach(() => {
        nock('http://localhost')
          .post('/api/sessions')
          .reply(400, {}, {'Content-Type': 'application/json'});
        window.sessionStorage.setItem('jwt', 'jwt456');
      });

      it('it dispatches the correct actions', (done) => {
        const expectedActions = [
          { type: actions.LOGIN_START },
          { type: actions.LOGIN_FAILURE, error: 'Login Failed' }
        ];
        const store = mockStore(initialState, expectedActions, () =>
        {
          expect(window.sessionStorage.getItem('jwt')).to.eql(null);
          done();
        });
        store.dispatch(actions.login());
      });
    });
  });
});
