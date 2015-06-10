'use strict';

var React = require('react');
var RewardList = require('./components/reward_list.jsx');
var request = require('superagent');

var App = React.createClass({displayName: "App",
  getInitialState: function() {
    return {notes: [], title: 'Rewards: '};
  },
  componentDidMount: function() {
    request
      .get('/api/notes')
      .end(function(err, res) {
        if (err) return console.log(err);

        this.setState({rewards: res.body});
      }.bind(this));
  },
  render: function() {
    return (
      React.createElement("main", null, 
        React.createElement("h1", null, this.state.title), 
        React.createElement(RewardList, {data: this.state.rewards})
      )
    );
  }
});

React.render(React.createElement(App, null), document.body);
