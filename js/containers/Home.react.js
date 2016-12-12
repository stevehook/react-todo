import React from 'react';
import { Link } from 'react-router';

const Home = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <div>
        <div class='header'>
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

        <div class='container'>
          <div class='row'>
            <div>
              <div className='detail'>
                {this.props.children}
              </div>
            </div>
          </div>
          <div class='footer'>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Home;
