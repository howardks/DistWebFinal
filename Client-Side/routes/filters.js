var path = require('path');
var express = require('express');
var router = express.Router();

var FiltersAPI = require('../filtersController');
var filtersAPI = new FiltersAPI();

//put routes in here
router.get('/universe/:universeId', (req, res) => {
    const universeId = parseInt(req.params.universeId);
    const filteredCharacters = filtersAPI.getCharactersByUniverse(universeId);
    res.json(filteredCharacters);
});

// TODO: Add route for filtering by favorites







module.exports = router;