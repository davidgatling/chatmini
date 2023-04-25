document.addEventListener('DOMContentLoaded', () => {
    // Connect to the server
    const socket = io('http://localhost:3000');
  
    // Get references to the HTML elements
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const messagesList = document.getElementById('message-container');
    const toUserIdInput = document.getElementById('to-user-id');
  
    // Listen for the "message" event from the server
    socket.on('message', (message) => {
      console.log('Received message:', message);
  
      // Add the message to the list of messages
      const li = document.createElement('li');
      li.textContent = message;
      messagesList.appendChild(li);
    });
  
    // Listen for the form submit event
    messageForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      // Get the message text from the input field
      const message = messageInput.value;
  
      // Get the "to" user ID
      const toUserId = toUserIdInput.value;
  
      // Send the message to the server
      socket.emit('message', message);
  
      // Clear the input field
      messageInput.value = '';
    });
  });
  
  function handleMessage(message) {
    const { from, to, content } = message;
  
    // Check if the message is intended for the current user
    if (to === socket.id || from === socket.id) {
      const li = document.createElement('li');
      li.textContent = `${from}: ${content}`;
      messagesList.appendChild(li);
    }
  }  