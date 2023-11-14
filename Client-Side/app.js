var express = require('express');
var path = require('path');

var charactersRouter = require('./routes/characters');
var publicRouter = require('./routes/public');
var favoritesRouter = require('./routes/favorites');

var app = express();

app.use('/characters/', charactersRouter);
app.use('/favorites/', favoritesRouter);
app.use('/', publicRouter);

const PORT  = process.env.PORT || 3050
app.listen(PORT,()=> console.info(`Server has started on ${PORT} - http://localhost:${PORT}`));


module.exports = app;