const expect = require('chai').expect;
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
const middlewares = [thunk];

function mockStore(getState, expectedActions, done) {
  if (!Array.isArray(expectedActions)) {
    throw new Error('expectedActions should be an array of expected actions.');
  }
  if (typeof done !== 'undefined' && typeof done !== 'function') {
    throw new Error('done should either be undefined or function.');
  }
  let calledDone = false;

  function mockStoreWithoutMiddleware() {
    return {
      getState() {
        return typeof getState === 'function' ?  getState() : getState;
      },

      dispatch(action) {
        const expectedAction = expectedActions.shift();

        try {
          expect(action).to.eql(expectedAction);
          if (done && !expectedActions.length) {
            if (!calledDone) {
              calledDone = true;
              done();
            }
          }
          return action;
        } catch (e) {
          if (!calledDone) {
            calledDone = true;
            done(e);
          }
        }
      }
    }
  }

  const mockStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(mockStoreWithoutMiddleware);

  return mockStoreWithMiddleware();
}

module.exports = mockStore;
