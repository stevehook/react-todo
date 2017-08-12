import request from 'superagent';
import ApiService from './ApiService';

class AuthService extends ApiService {
  static login(email, password) {
    return ApiService.promisify(
      request
        .post('/api/sessions')
        .send({ user: { email, password } })
        .set('accept', 'application/json'),
    );
  }

  static checkLoggedIn() {
    return ApiService.promisify(
      request
        .get('/api/session')
        .set('authorization', `Bearer ${window.sessionStorage.getItem('jwt')}`)
        .set('accept', 'application/json'),
    );
  }
}

module.exports = AuthService;
