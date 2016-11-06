import React  from 'react';
import ReactDOM from 'react-dom';
import { login } from '../actions/actionTypes';
import { connect } from 'react-redux';

const LoginForm = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function(){
    this.refs.loginEmail.focus();
  },

  onLogin: function(email, password) {
    const { dispatch } = this.props;
    dispatch(login(email, password));
  },

  render: function() {
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <input type='text' className='form-control user-email' ref='loginEmail' placeholder='Enter your email address' defaultValue='bob@example.com'/>
          <input type='pasword' className='form-control user-password' ref='loginPassword' defaultValue='secret'/>
          <button type='submit' className='btn btn-default'>Login</button>
        </form>
      </div>
    );
  },

  handleSubmit: function(event) {
    event.preventDefault();
    let email = ReactDOM.findDOMNode(this.refs.loginEmail).value.trim();
    let password = ReactDOM.findDOMNode(this.refs.loginPassword).value.trim();
    this.onLogin(email, password);
  }
});

export default connect(null)(LoginForm);
