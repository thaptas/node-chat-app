require('./../config/config.js');

const http = require('http');
const _ = require('lodash');
const express = require('express');
const socketIO = require('socket.io');

const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const path = require('path');
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


const port = process.env.PORT || 3000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


//mongoose.set('useFindAndModify', false);
//middleware set static folder
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  })
});




server.listen(port, () => {
  console.log('Server is up on port ', port)
});
