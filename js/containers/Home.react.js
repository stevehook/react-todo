const React = require('react');

const Home = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <div>
        <p>Home</p>
        <div className="detail">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Home;
