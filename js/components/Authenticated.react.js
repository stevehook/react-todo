import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

const authenticated = (Component) => {
  class Authenticated extends React.Component {
    componentWillMount() {
      this.checkAuth(this.props.loggedIn);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.loggedIn);
    }

    checkAuth(loggedIn) {
      if (!loggedIn) {
        let redirectAfterLogin = this.props.location.pathname;
        hashHistory.push(`/login?next=${redirectAfterLogin}`);
      }
    }

    render() {
      return (
        <div>
        {this.props.loggedIn === true
          ? <Component {...this.props}/>
          : null
        }
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    loggedIn: state.authentication.loggedIn
  });

  return connect(mapStateToProps)(Authenticated);
}
export default authenticated;
