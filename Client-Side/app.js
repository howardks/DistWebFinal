var express = require('express');
var path = require('path');

var charactersRouter = require('./routes/characters');
var publicRouter = require('./routes/public');

var FavoritesAPI = require('./favoritesController');
var favoritesApi = new FavoritesAPI();

var app = express();

app.use('/characters/', charactersRouter);
app.use('/', publicRouter);

app.post('/favorites/:characterId', function(req, res) {
    favoritesApi.addFavorite(req.params.characterId);
    res.status(200).send('Favorite added');
});

app.get('/favorites', function(req, res) {
    res.json(favoritesApi.getFavorites());
});

const PORT  = process.env.PORT || 3050
app.listen(PORT,()=> console.info(`Server has started on ${PORT} - http://localhost:${PORT}`));


module.exports = app;