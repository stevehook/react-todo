import React from 'react';
import { connect } from 'react-redux';

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
        console.log('TODO: redirect to login page...');
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
console.log(authenticated);
export default authenticated;
