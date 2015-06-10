'use strict';

var Reward = require('../models/Reward');
var bodyparser = require('body-parser');

module.exports = function(router) {
  router.use(bodyparser.json());

  router.get('/rewards', function(req, res) {
    Reward.find({}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json(data);
    });
  });

  router.post('/rewards', function(req, res) {
    var newReward = new Reward(req.body);
    newReward.save(function(err, data) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(data);
    });
  });

  router.put('/rewards/:id', function(req, res) {
    var update = req.body;
    delete update._id;

    Reward.update({'_id': req.params.id}, update, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json({msg: 'update successful'});
    });

  });

  router.delete('/rewards/:id', function(req, res) {
    Reward.remove({'_id': req.params.id}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json({msg: 'delete successful'});
    });
  });
};
