var express = require('express');
var router = express.Router();

var FavoritesController = require('../favoritesAPI/favoritesController');
var favoritesController = new FavoritesController();

router.post('/add/:id', function(req, res) {
    favoritesController.addFavorite(req.params.id);
    res.status(200).send('Favorite added');
});

router.delete('/remove/:id', function(req, res) {
    favoritesController.removeFavorite(req.params.id);
    res.status(200).send('Favorite removed');
});

router.get('/', function(req, res) {
    res.json(favoritesController.getFavorites());
});

module.exports = router;
