'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/rewards_test';
require('../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

var Reward = require('../models/Reward');

describe('reward REST api', function() {
  var id;

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a new reward profile', function(done) {
    chai.request('localhost:3000')
      .post('/api/rewards')
      .send({level: 'gold', points: 2000})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.level).to.eql('gold');
        expect(res.body.points).to.eql(2000);
        expect(res.body).to.have.property('_id');
        id = res.body._id;
        done();
      });
  });

  it('should be able to get an array of reward profiles', function(done) {
    chai.request('localhost:3000')
      .get('/api/rewards')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should invalidate a bad input', function(done) {
    chai.request('localhost:3000')
      .post('/api/rewards')
      .send({level: 'blue', points: 4100})
      .end(function(err, res) {
        expect(res.body.name).to.eql('ValidationError');
        done();
      });

  });

  it('should be able to update a reward profile', function(done) {
    chai.request('localhost:3000')
      .put('/api/rewards/' + id)
      .send({level: 'platinum', points: 3000})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('update successful');
        done();
      });
  });

  it('should be able to delete a reward profile', function(done) {
    chai.request('localhost:3000')
      .del('/api/rewards/' + id)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('delete successful');
        done();
      });
  });

});
