var mongoose = require('mongoose');
require('./play');

var gameSchema = new mongoose.Schema({
  apiId: Number,
  name: String,
  publisher: String,
  year: Number,
  image: String,
  plays: [{type: mongoose.Schema.Types.ObjectId, ref: 'Play'}]
});

module.exports = mongoose.model('Game', gameSchema);
