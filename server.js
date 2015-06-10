'use strict';

var mongoose = require('mongoose');
var express = require('express');
var app = express();

var rewardRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/notes_development');

app.use(express.static(__dirname + '/build'));

require('./routes/reward_routes')(rewardRoutes);

app.use('/api', rewardRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port ' + (process.env.PORT || 3000));
});
