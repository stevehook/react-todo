const request = require('superagent');
const ApiService = require('./ApiService');

class TaskService extends ApiService {
  getOutstanding() {
    return this.promisify(
      request
        .get('/api/tasks')
        .set('authorization', `Bearer ${window.sessionStorage.getItem('jwt')}`)
        .set('Accept', 'application/json')
    );
  }

  create(projectId, title) {
    return this.promisify(
      request
        .post(`/api/projects/${projectId}/tasks`)
        .set('authorization', `Bearer ${window.sessionStorage.getItem('jwt')}`)
        .send({ task: { title: title } })
        .set('Accept', 'application/json')
    );
  }

  complete(taskId) {
    return this.promisify(
      request
        .post(`/api/tasks/${taskId}/complete`)
        .set('authorization', `Bearer ${window.sessionStorage.getItem('jwt')}`)
        .set({ 'X-Http-Method-Override': 'PATCH', 'Accept': 'application/json' })
    );
  }

  archive(taskId) {
    return this.promisify(
      request
        .post(`/api/tasks/${taskId}/archive`)
        .set('authorization', `Bearer ${window.sessionStorage.getItem('jwt')}`)
        .set({ 'X-Http-Method-Override': 'PATCH', 'Accept': 'application/json' })
    );
  }
};

module.exports = TaskService;
