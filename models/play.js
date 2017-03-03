var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var playerSchema = new Schema ({
  name: String,
  score: Number,
  winner: {type: Boolean, default: false},
  newPlayer: { type: Boolean, default: true}
});

var playSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  date: { type: Date, default: Date.now },
  players: [playerSchema],
  location: String,
  comments: [String],
  game: {type: Schema.Types.ObjectId, ref: 'Game'}
});

playSchema.methods.getWinner = function() {
  var playDoc = this;
  return playDoc.players.find(player => player.winner);
}

module.exports = mongoose.model('Play', playSchema);
