var path = require('path');
var express = require('express');
var router = express.Router();

var filtersController = require('../filtersAPI/filtersController');

//put routes in here

router.get('/', function(req, res, next) {
    let filter = new filtersController();
    filter.getMember();

});







module.exports = router;