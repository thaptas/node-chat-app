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
  // socket.emit from Admin text Welcome to the chat application
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat'
  });

  // socket.broadcast.emit from Admin text New user joined
  socket.broadcast.emit('newMessage', {
      from: 'Admin',
      text: 'Welcome to the chat app',
      createdAt: new Date().getTime()
  });

  socket.emit('newEmail', {
    from: 'mike@example.com',
    text: 'Hi, what is going on',
    createAt: 123
  });

  socket.on('createEmail', (newEmail) => {
    console.log('New email to create:', newEmail);
  });

  socket.emit('newMessage', {
    from: 'mike@example.com',
    text: 'Hi, what is going on',
    createAt: 123
  });

  socket.on('createMessage', (message) => {
    console.log('New message to create:', message);
    //broadcasting events
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });

  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  })
});




server.listen(port, () => {
  console.log('Server is up on port ', port)
});
