const request = require('superagent');
const ApiService = require('./ApiService');

class AuthService extends ApiService {
  login(email, password) {
    return this.promisify(
      request
        .post('/api/sessions')
        .send({ user: { email: email, password: password } })
        .set('accept', 'application/json')
    );
  }

  logout() {
    // TODO: Call the API to delete the current session
  }

  checkLoggedIn() {
    return this.promisify(
      request
        .get('/api/session')
        .set('authorization', `Bearer ${window.sessionStorage.getItem('jwt')}`)
        .set('accept', 'application/json')
    );
  }
};

module.exports = AuthService;
