const request = require('superagent');

class ApiService {
  promisify(req) {
    return new Promise((resolve, reject) => {
      req.end((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  }

  getAuthenticatedRequest() {
    return request.set('Authorization', `Bearer $(sessionStorage.getItem('jwt'))`);
  }
};

module.exports = ApiService;
