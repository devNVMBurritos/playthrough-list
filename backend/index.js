const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const glob = require("glob");

// Models
require('./models/user/user');
require('./models/game/game');
require('./models/playthrough/playthrough');
require('./models/review/review');

// Routes
const routes = require('./routes.js');

dotenv.config();
const app = express();

app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MongoURI);

routes.forEach((route) => {
  const { method, path, middleware, handler } = route;
  app[method](path, ...middleware, handler);
});

var server = app.listen(process.env.PORT || 3306, () => {
  console.log('server is running on:' + server.address().port);
});
