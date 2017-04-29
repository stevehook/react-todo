import React from 'react';
import { Link } from 'react-router';

class Home extends React.Component {
  getInitialState() {
    return {};
  }

  render() {
    return (
      <div>
        <div>
          <nav className='navbar navbar-inverse'>
            <div className='container-fluid'>
              <div className='navbar-header'>
                <Link className='navbar-brand' to='/'>Todo</Link>
                <Link className='navbar-text' to='/projects'>Projects</Link>
                <p className='navbar-text navbar-right'>
                  Signed in as <Link to='/' className='navbar-link'>Bob Roberts</Link>
                </p>
              </div>
            </div>
          </nav>
        </div>

        <div className='container'>
          <div className='row'>
            <div>
              <div className='detail'>
                {this.props.children}
              </div>
            </div>
          </div>
          <div className='footer'>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Home;
