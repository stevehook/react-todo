import expect from 'expect';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Authenticated from '../../js/components/Authenticated.react';
import { hashHistory } from 'react-router';

class TestComponent extends React.Component {
  render() {
    return (
      <div>Authenticated content</div>
    );
  }
}
const AuthenticatedComponent = Authenticated(TestComponent);

describe('render', () => {
  let instance;
  let store;
  const location = { pathname: '/foo' };

  const setupWithInitialState = (initialAuthState) => {
    store = createStore(state => state, { authentication: initialAuthState });
    expect.spyOn(hashHistory, 'push');

    instance = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <AuthenticatedComponent location={ location } />
      </Provider>
    );
  };

  describe('while checking logged in status', () => {
    beforeEach(() => {
      setupWithInitialState({ jwt: null, loggedIn: null });
    });

    it('renders a Logging in message', () => {
      let div = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
      expect(div.innerHTML).toMatch('Logging in...');
    });
  });

  describe('when logged in', () => {
    beforeEach(() => {
      setupWithInitialState({ jwt: '123', loggedIn: true });
    });

    it('renders the contained component', () => {
      let div = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
      expect(div.innerHTML).toMatch('Authenticated content');
    });
  });

  describe('when NOT logged in', () => {
    beforeEach(() => {
      setupWithInitialState({ jwt: null, loggedIn: false });
    });

    it('renders null', () => {
      expect(hashHistory.push).toHaveBeenCalledWith('/login?next=/foo');
    });
  });
});

