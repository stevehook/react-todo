require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import Root from './containers/Root.react';
import todoApp from './reducers/todoApp';
// import { loginUserSuccess } from './actions/actionTypes';

import thunkMiddleware from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
let store = createStoreWithMiddleware(todoApp, {
  authentication: {
    loggedIn: undefined,
    user: null
  },
  data: {}
});

// let jwt = localStorage.getItem('jwt');
// if (jwt !== null) {
//   store.dispatch(loginUserSuccess(jwt));
// }

// TODO: Do I really need to pass the store as prop to TodoApp as well?
ReactDOM.render(<Provider store={store}><Root/></Provider>,
                document.getElementById('todoapp'));
