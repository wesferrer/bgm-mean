var express = require('express');
var router = express.Router();
var gameCtrl = require('../controllers/games');
var userCtrl = require('../controllers/users');

// Public routes (no auth required)
router.post('/users/login', userCtrl.login);
router.get('/users/logout', userCtrl.logout);
router.post('/users', userCtrl.create);
router.get('/users/me', userCtrl.me);
router.get('/games', gameCtrl.getAllGames);

// Auth middleware (routes below need authentication)
router.use(function(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'not authenticated'});
});

// Protected routes (authentication required)
router.get('/games/user', gameCtrl.getGamesForUser);
router.delete('/games/:id', gameCtrl.deleteGame);
router.get('/search', gameCtrl.searchGames);
router.post('/games', gameCtrl.addGameToDB);
router.get('/games/:id', gameCtrl.getGame);

module.exports = router;
