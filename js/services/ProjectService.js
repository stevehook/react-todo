const request = require('superagent');
const ApiService = require('./ApiService');

class ProjectService extends ApiService {
  static get() {
    return ApiService.promisify(
      request
        .get('/api/projects')
        .set('authorization', `Bearer ${window.sessionStorage.getItem('jwt')}`)
        .set('Accept', 'application/json'),
    );
  }

  static create(name) {
    return ApiService.promisify(
      request
        .post('/api/projects')
        .send({ project: { name } })
        .set('authorization', `Bearer ${window.sessionStorage.getItem('jwt')}`)
        .set('Accept', 'application/json'),
    );
  }
}

module.exports = ProjectService;
