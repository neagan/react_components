'use strict';

var React = require('react');

module.exports = React.createClass({
  handleSubmit: function(event) {
    event.preventDefault();
    var level = React.findDOMNode(this.refs.level).value.trim();
    var points = React.findDOMNode(this.refs.points).value.trim();
    if (!level || !points) {
      return; // prevents submit without both values
    }

    this.props.onRewardSubmit({level: level, points: points});
    React.findDOMNode(this.refs.level).value = '';
    React.findDOMNode(this.refs.points).value = '';
    return;
  },
  render: function() {
    return (
      <form className="rewardForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Level" ref="level" />
        <input type="text" placeholder="Points" ref="points" />
        <input type="submit" value="Post" />
      </form>
    );
  }

});
