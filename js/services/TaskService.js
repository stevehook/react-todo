const request = require('superagent');
const ApiService = require('./ApiService');

class TaskService extends ApiService {
  static getOutstanding() {
    return ApiService.promisify(
      request
        .get('/api/tasks')
        .set('authorization', `Bearer ${window.sessionStorage.getItem('jwt')}`)
        .set('Accept', 'application/json'),
    );
  }

  static create(projectId, title) {
    return ApiService.promisify(
      request
        .post(`/api/projects/${projectId}/tasks`)
        .set('authorization', `Bearer ${window.sessionStorage.getItem('jwt')}`)
        .send({ task: { title } })
        .set('Accept', 'application/json'),
    );
  }

  static complete(projectId, taskId) {
    return ApiService.promisify(
      request
        .patch(`/api/projects/${projectId}/tasks/${taskId}/complete`)
        .set('authorization', `Bearer ${window.sessionStorage.getItem('jwt')}`)
        .set({ 'X-Http-Method-Override': 'PATCH', Accept: 'application/json' }),
    );
  }

  static archive(projectId, taskId) {
    return ApiService.promisify(
      request
        .patch(`/api/projects/${projectId}/tasks/${taskId}/archive`)
        .set('authorization', `Bearer ${window.sessionStorage.getItem('jwt')}`)
        .set({ 'X-Http-Method-Override': 'PATCH', Accept: 'application/json' }),
    );
  }
}

module.exports = TaskService;
