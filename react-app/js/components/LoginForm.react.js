const React = require('react');
const AuthService = require('../services/AuthService');

const LoginForm = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <input type='text' className='form-control user-email' ref='loginEmail' placeholder='Enter your email address' autofocus/>
          <input type='pasword' className='form-control user-password' ref='loginPassword'/>
          <button type='submit' className='btn btn-default'>Login</button>
        </form>
      </div>
    );
  },

  handleSubmit: function(event) {
    event.preventDefault();
    let _this = this;

    let email = React.findDOMNode(this.refs.loginEmail).value.trim();
    let password = React.findDOMNode(this.refs.loginPassword).value.trim();

    let authService = new AuthService();
    authService.login(email, password).then((data) => {
      _this.props.onAuthenticationSucceeded(data);
    }).catch(() => {
      _this.props.onAuthenticationFailed();
    });
  }
});

module.exports = LoginForm;