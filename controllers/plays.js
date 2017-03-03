var Play = require('../models/play');
var Game = require('../models/game');
var ObjectId = require('mongoose').Schema.Types.ObjectId;
var request = require('request');

module.exports = {
  userPlays,
  createPlay
}

function userPlays(req, res, next) {
  Play.find({user: req.user._id}).populate('game').exec().then(plays => {
    // plays = plays.filter(function(play) {
    //   play.user._id.equals(req.user._id)
    // })
    console.log(plays)
    res.json(plays);
  }).catch(err => res.status(500).json(err));
}

// function getPlaysForUser(req, res, next) {
//   Game.find({}).populate('plays').exec().then(games => {
//     games = games.filter(game => game.plays.some(play => play.user.equals(req.user._id)));
//     console.log(games)
//     res.json(games);
//   }).catch(err => res.status(500).json(err));
// }

function createPlay(req, res, next) {
  var play = new Play();
  play.user = req.user._id;
  play.date = new Date(req.body.date);
  play.location = req.body.location;
  play.game = req.body.game;
  if (req.body.p1name) play.players.push({ name: req.body.p1name, score: req.body.p1score});
  if (req.body.p2name) play.players.push({ name: req.body.p2name, score: req.body.p2score});
  if (req.body.p3name) play.players.push({ name: req.body.p3name, score: req.body.p3score});
  if (req.body.p4name) play.players.push({ name: req.body.p4name, score: req.body.p4score});
  play.save().then(play => {
    Game.findById(play.game).then(function(game) {
      game.plays.push(play._id);
      game.save(function() {
        res.json(play);
      });
    });
  }).catch( err => res.status(400).json(err) );
}

