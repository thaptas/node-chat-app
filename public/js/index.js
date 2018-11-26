var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  socket.emit('createEmail', {
      to: 'jen@example.com',
      text: 'Hey. I am perfectly fine. Thanks'
    });

  socket.emit('createMessage', {
      to: 'jen@example.com',
      text: 'Hey. Great to hear you all.'
    });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

//custom events with socketIO
socket.on('newEmail', function (email) {
  console.log('New email arrived', email);
});

socket.on('newMessage', function (message) {
  console.log('New message', message);
});
