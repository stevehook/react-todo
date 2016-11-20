const request = require('superagent');


const ApiService = require('./ApiService');

class ProjectService extends ApiService {
  get() {
    return this.promisify(
      request
        .get('/api/projects')
        .set('authorization', `Bearer ${window.sessionStorage.getItem('jwt')}`)
        .set('Accept', 'application/json')
    );
  }

  create(name) {
    return this.promisify(
      request
        .post('/api/projects')
        .send({ project: { name: name } })
        .set('authorization', `Bearer ${window.sessionStorage.getItem('jwt')}`)
        .set('Accept', 'application/json')
    );
  }
};

module.exports = ProjectService;
