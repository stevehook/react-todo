const React = require('react');

const ProjectListItem = React.createClass({
  render: function() {
  	return (
      <li className=''>
        <span>{this.props.project.name}</span>
      </li>
  	);
  },
});

module.exports = ProjectListItem;
