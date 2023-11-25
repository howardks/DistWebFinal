var path = require('path');
var express = require('express');
var router = express.Router();

var filtersController = require('../filtersAPI/filtersController');

router.get('/', function(req, res, next){
    controller = new filtersController();
    result = controller.getFilters();
    res.send(result);
});

router.get('/byUniverse/:universe', function(req, res, next){
    controller = new filtersController();
    result = controller.getFiltersByUniverse(req.params.universe);
    res.send(result);
});

router.get('/byFavorite/:favorite', function(req, res, next){
    controller = new filtersController();
    result = controller.getFiltersByFavorite(req.params.favorite);
    res.send(result);
});

module.exports = router;
