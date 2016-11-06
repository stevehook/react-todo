require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import TodoApp from './components/TodoApp.react';
import Root from './components/Root.react';
import todoApp from './reducers/todoApp';

import thunkMiddleware from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
let store = createStoreWithMiddleware(todoApp, { authentication: { loggedIn: false, user: null }, data: {} });

// TODO: Do I really need to pass the store as prop to TodoApp as well?
ReactDOM.render(<Provider store={store}><Root/></Provider>,
                document.getElementById('todoapp'));
