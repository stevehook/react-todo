import React  from 'react';
import ReactDOM from 'react-dom';
import { login } from '../actions/actionTypes';
import { connect } from 'react-redux';

class LoginForm extends React.Component {
  componentDidMount() {
    this.refs.loginEmail.focus();
    this.redirectRoute = this.props.location.query.next || '/';
  }

  onLogin(email, password) {
    const { dispatch } = this.props;
    dispatch(login(email, password, this.redirectRoute));
  }

  handleSubmit(event) {
    event.preventDefault();
    let email = ReactDOM.findDOMNode(this.refs.loginEmail).value.trim();
    let password = ReactDOM.findDOMNode(this.refs.loginPassword).value.trim();
    this.onLogin(email, password);
  }

  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type='text' className='form-control user-email' ref='loginEmail' placeholder='Enter your email address' defaultValue='bob@example.com'/>
          <input type='pasword' className='form-control user-password' ref='loginPassword' defaultValue='secret'/>
          <button type='submit' className='btn btn-default'>Login</button>
        </form>
      </div>
    );
  }
}

export default connect(state => state)(LoginForm);
