import TaskService from '../services/TaskService';
import ProjectService from '../services/ProjectService';
import AuthService from '../services/AuthService';
import { hashHistory } from 'react-router';

export const CHECK_LOGGED_IN_START = 'CHECK_LOGGED_IN_START';
export const CHECK_LOGGED_IN_SUCCESS = 'CHECK_LOGGED_IN_SUCCESS';
export const CHECK_LOGGED_IN_FAILURE = 'CHECK_LOGGED_IN_FAILURE';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const FETCH_TASKS_START = 'FETCH_TASKS_START';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

export const LOGOUT = 'LOGOUT';

export const ADD_TASK = 'ADD_TASK';
export const ADD_TASK_START = 'ADD_TASK_START';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';

export const COMPLETE_TASK = 'COMPLETE_TASK';
export const COMPLETE_TASK_START = 'COMPLETE_TASK_START';
export const COMPLETE_TASK_SUCCESS = 'COMPLETE_TASK_SUCCESS';
export const COMPLETE_TASK_FAILURE = 'COMPLETE_TASK_FAILURE';

export const ARCHIVE_TASK = 'ARCHIVE_TASK';
export const ARCHIVE_TASK_START = 'ARCHIVE_TASK_START';
export const ARCHIVE_TASK_SUCCESS = 'ARCHIVE_TASK_SUCCESS';
export const ARCHIVE_TASK_FAILURE = 'ARCHIVE_TASK_FAILURE';

export const ADD_PROJECT = 'ADD_PROJECT';
export const ADD_PROJECT_START = 'ADD_PROJECT_START';
export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS';
export const ADD_PROJECT_FAILURE = 'ADD_PROJECT_FAILURE';
export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const FETCH_PROJECTS_START = 'FETCH_PROJECTS_START';
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const FETCH_PROJECTS_FAILURE = 'FETCH_PROJECTS_FAILURE';

export function checkLoggedIn() {
  return function (dispatch) {
    dispatch(checkLoggedInStart());
    let jwt = window.sessionStorage.getItem('jwt');
    if (!jwt) {
      dispatch(checkLoggedInFailure('Login Failed'));
      return;
    }
    let authService = new AuthService();
    return authService.checkLoggedIn()
      .then((res) => {
        console.log('checkLoggedInSuccess');
        dispatch(checkLoggedInSuccess(res.body));
      })
      .catch((err) => {
        console.log('checkLoggedInFailure');
        window.sessionStorage.removeItem('jwt');
        dispatch(checkLoggedInFailure('Login Failed'));
      });
  }
};

export function checkLoggedInStart() {
  return { type: CHECK_LOGGED_IN_START };
};

export function checkLoggedInSuccess(user) {
  return { type: CHECK_LOGGED_IN_SUCCESS, user };
};

export function checkLoggedInFailure(error) {
  return { type: CHECK_LOGGED_IN_FAILURE, error };
};

export function login(email, password, redirectRoute) {
  return function (dispatch) {
    dispatch(loginStart());
    let authService = new AuthService();
    return authService.login(email, password)
      .then((res) => {
        window.sessionStorage.setItem('jwt', res.body.jwt);
        return dispatch(loginSuccess(res.body.user, redirectRoute));
      })
      .catch((err) => {
        window.sessionStorage.removeItem('jwt');
        return dispatch(loginFailure('Login Failed'));
      });
  }
};

export function loginStart() {
  return { type: LOGIN_START };
};

export function loginSuccess(user, redirectRoute = '/') {
  hashHistory.push(redirectRoute);
  return { type: LOGIN_SUCCESS, user };
};

export function loginFailure(error) {
  return { type: LOGIN_FAILURE, error };
};

export function fetchTasks() {
  return function (dispatch) {
    dispatch(fetchTasksStart());
    let taskService = new TaskService();
    return taskService.getOutstanding()
      .then(res => dispatch(fetchTasksSuccess(res.body)))
      .catch(err => dispatch(fetchTasksFailure('API Failed')));
  }
};

export function fetchTasksStart() {
  return { type: FETCH_TASKS_START };
};

export function fetchTasksSuccess(tasks) {
  return { type: FETCH_TASKS_SUCCESS, tasks };
};

export function fetchTasksFailure(error) {
  return { type: FETCH_TASKS_FAILURE, error };
};

export function addTask(projectId, title) {
  return function (dispatch) {
    dispatch(addTaskStart());
    let taskService = new TaskService();
    return taskService.create(projectId, title)
      .then(res => dispatch(addTaskSuccess(res.body)))
      .catch(err => dispatch(addTaskFailure('API Failed')));
  }
};

export function addTaskStart() {
  return { type: ADD_TASK_START };
};
export function addTaskSuccess(task) {
  return { type: ADD_TASK_SUCCESS, task };
};
export function addTaskFailure(error) {
  return { type: ADD_TASK_FAILURE, error };
};

export function completeTask(projectId, taskId) {
  return function (dispatch) {
    dispatch(completeTaskStart());
    let taskService = new TaskService();
    return taskService.complete(projectId, taskId)
      .then(res => dispatch(completeTaskSuccess(res.body)))
      .catch(err => dispatch(completeTaskFailure('API Failed')));
  }
};

export function completeTaskStart() {
  return { type: COMPLETE_TASK_START };
};
export function completeTaskSuccess(task) {
  return { type: COMPLETE_TASK_SUCCESS, task };
};
export function completeTaskFailure(error) {
  return { type: COMPLETE_TASK_FAILURE, error };
};


export function archiveTask(projectId, taskId) {
  return function (dispatch) {
    dispatch(archiveTaskStart());
    let taskService = new TaskService();
    return taskService.archive(projectId, taskId)
      .then(res => dispatch(archiveTaskSuccess(res.body)))
      .catch(err => dispatch(archiveTaskFailure('API Failed')));
  }
};

export function archiveTaskStart() {
  return { type: ARCHIVE_TASK_START };
};
export function archiveTaskSuccess(task) {
  return { type: ARCHIVE_TASK_SUCCESS, task };
};
export function archiveTaskFailure(error) {
  return { type: ARCHIVE_TASK_FAILURE, error };
};

export function fetchProjects() {
  return function (dispatch) {
    dispatch(fetchProjectsStart());
    let projectService = new ProjectService();
    return projectService.get()
      .then(res => dispatch(fetchProjectsSuccess(res.body)))
      .catch(err => dispatch(fetchProjectsFailure('API Failed')));
  }
};

export function fetchProjectsStart() {
  return { type: FETCH_PROJECTS_START };
};

export function fetchProjectsSuccess(projects) {
  return { type: FETCH_PROJECTS_SUCCESS, projects };
};

export function fetchProjectsFailure(error) {
  return { type: FETCH_PROJECTS_FAILURE, error };
};
