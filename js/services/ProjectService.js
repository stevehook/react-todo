const request = require('superagent');


const ApiService = require('./ApiService');

class ProjectService extends ApiService {
  get() {
    return this.promisify(
      request
        .get('/api/projects')
        .set('Authorization', `Bearer ${window.sessionStorage.getItem('jwt')}`)
        .set('Accept', 'application/json')
    );
  }

  create(name) {
    return this.promisify(
      request
        .post('/api/projects')
        .send({ project: { name: name } })
        .set('Authorization', `Bearer ${window.sessionStorage.getItem('jwt')}`)
        .set('Accept', 'application/json')
    );
  }
};

module.exports = ProjectService;
