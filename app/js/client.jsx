'use strict';

var React = require('react');
var RewardList = require('./components/reward_list.jsx');
var RewardForm = require('./components/reward_form.jsx');
var request = require('superagent');

var App = React.createClass({
  handleRewardSubmit: function(reward) {
    console.log('Submitted!');
    // TODO post request
  },
  getInitialState: function() {
    return {rewards: [], title: 'Rewards: '};
  },
  componentDidMount: function() {
    request
      .get('/api/rewards')
      .end(function(err, res) {
        if (err) return console.log(err);

        this.setState({rewards: res.body});
      }.bind(this));
  },
  render: function() {
    return (
      <main>
        <h1>{this.state.title}</h1>
        <RewardList data={this.state.rewards} />
        <RewardForm onRewardSubmit={this.handleRewardSubmit} />
      </main>
    );
  }
});

React.render(<App />, document.body);
