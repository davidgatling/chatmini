const server = require('http').createServer();
const io = require('socket.io')(server, {
    cors: true
  });

io.on('connection', (socket) => {
  console.log('A user connected.');

  // Listen for a "message" event from the client
  socket.on('message', (message) => {
    console.log('Received message:', message);

    // Broadcast the message to all connected clients
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

  