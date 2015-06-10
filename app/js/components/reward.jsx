'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <li>{this.props.data.level}: {this.props.data.points}</li>
      </div>
    );
  }
});
