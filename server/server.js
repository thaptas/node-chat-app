require('./../config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const path = require('path');
const publicPath = path.join(__dirname, '../public');

var app = express();
const port = process.env.PORT || 3000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


//mongoose.set('useFindAndModify', false);
//middleware set static folder
app.use(express.static(publicPath));


app.listen(port, () => {
  console.log('Server is up on port ', port)
});
