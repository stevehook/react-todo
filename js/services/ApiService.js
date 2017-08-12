import request from 'superagent';

class ApiService {
  static promisify(req) {
    return new Promise((resolve, reject) => {
      req.end((err, res) => (err ? reject(err) : resolve(res)));
    });
  }

  static getAuthenticatedRequest() {
    return request.set('authorization', "Bearer $(sessionStorage.getItem('jwt'))");
  }
}

module.exports = ApiService;
