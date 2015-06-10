'use strict';

var React = require('react');
var Reward = require('./reward.jsx');

module.exports = React.createClass({
  renderRewards: function() {
    return this.props.data.map(function(reward) {
      return <Reward data={reward} key={reward._id} />;
    });
  },
  render: function() {
    return (
      <ul>
        {this.renderRewards()}
      </ul>
    );
  }
});
