const React = require('react');

const Home = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <div>
        <div class='header'>
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="#">Todo</a>
                <p className="navbar-text navbar-right">
                  Signed in as <a href="#" className="navbar-link">Bob Roberts</a>
                </p>
              </div>
            </div>
          </nav>
        </div>

        <div class='container'>
          <div class="row">
            <div>
              <div className="detail">
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
