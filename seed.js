require('dotenv').config();
var mongoose = require('mongoose');
mongoose.Promise = Promise;
require('./config/database');
var Game = require('./models/game');
var Play = require('./models/play');
var User = require('./models/user');

var userSave;

var promises = [
  Game.remove({}),
  Play.remove({})
];

Promise.all(promises).then(() =>
  User.findOne({})
).then(user => {
  userSave = user;
  return Play.create([
    {
      user: user._id,
      date: new Date(),
      players: [{name: 'Jim', score: 20, winner: false, newPlayer: true}, {name: 'Wes', score: 30, winner: true, newPlayer: false}],
      location: 'Pair a Dice',
      comments: ['boys rule', 'girls drool']
    },
    {
      user: mongoose.Types.ObjectId('58b5efc66e54f3db3e9230fb'),
      date: new Date(),
      players: [{name: 'James', score: 22, winner: true, newPlayer: true}, {name: 'Wes', score: 12, winner: false, newPlayer: false}],
      location: 'Home',
      comments: ['boys rule', 'girls drool']
    }
  ]);
}).then(plays => {
  return Game.create([
      {
        name: 'Clank!',
        publisher: 'Renegade Games',
        year: 2016,
        image: '',
        plays: [plays[0]._id, plays[1]._id]
      },
      {
        name: 'Gloomhaven',
        publisher: 'Cephalofair',
        year: 2017,
        image: '',
        plays: []
      }
    ]);
}).then(games => {
  return Game.find({}).populate('plays').exec();
}).then(games => {
  games = games.filter(game => game.plays.some(play => play.user.equals(userSave._id)));
  console.log('found games', games);
})


.then(() => {
  mongoose.connection.close();
  process.exit();
});

// var gameSchema = new mongoose.Schema({
//   name: String,
//   publisher: String,
//   year: Number,
//   image: String,
//   plays: [{type: mongoose.Schema.Types.ObjectId, ref: 'Play'}]
// });


// var playerSchema = new Schema ({
//   name: String,
//   score: Number,
//   winner: {type: Boolean, default: false},
//   newPlayer: Boolean
// });

// var playSchema = new Schema({
//   user: {type: Schema.Types.ObjectId, ref: 'User'},
//   date: { type: Date, default: Date.now },
//   players: [playerSchema],
//   location: String,
//   comments: [String],
// });
