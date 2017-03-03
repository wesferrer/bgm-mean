var Game = require('../models/game');
var ObjectId = require('mongoose').Schema.Types.ObjectId;
var request = require('request');
var parseString = require('xml2js').parseString;

module.exports = {
  getAllGames,
  deleteGame,
  getGamesForUser,
  searchGames,
  addGameToDB,
  getGame,
  playsForUser
};

function getAllGames(req, res, next) {
  Game.find({}).exec().then(games => {
    res.json(games);
  }).catch(err => res.status(500).json(err));
}

function getGame(req, res, next) {
  Game.findById(req.params.id).populate('plays').exec().then(game => {
    res.json(game);
  }).catch(err => res.status(500).json(err));
}

function deleteGame(req, res, next) {
  Game.findByIdAndRemove(req.params.id).then(deletedGame => {
    res.json(deletedGame);
  }).catch(err => res.status(400).json(err));
}

function getGamesForUser(req, res, next) {
  Game.find({}).populate({
      path: 'plays',
      match: { user: req.user._id }
    }).exec().then(games => {
    games = games.filter(game => game.plays.some(play => play.user.equals(req.user._id)));
    console.log(games)
    res.json(games);
  }).catch(err => res.status(500).json(err));
}

function searchGames(req, res, next) {
  var search = req.query.search;
  request('https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=' + search, function(err, response, body){
    if (!err && response.statusCode == 200){
      var xml = body;
      parseString(xml, function(error, result) {
        res.json({result})
      })
    }
  });
}

function addGameToDB(req, res, next) {
  Game.findOne({apiId: req.body.apiId}, function(err, game) {
    console.log('game');
    console.log(game);
    if (!game) {
      Game.create(req.body).then(function(game){
       res.status(201).json(game);
      });
    } else {
      res.status(400).json('game already exists');
    }
  });
  // Game.create(req.body).then(function(game){
  //  res.status(201).json(game);
  // });
}

function playsForUser(req, res, next) {
 Play.find({user: req.user._id}, function(err, plays) {
   res.status(200).json(plays);
 });
}

