# Collaborite

**Collaborite** is a lightweight real-time collaboration library that enables multiple users to seamlessly edit and sync data across clients. Ideal for applications such as collaborative document editing, whiteboards, and chat systems, Collaborite simplifies the integration of live updates in your projects.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Real-Time Collaboration**: Multiple users can edit and sync data simultaneously.
- **Live Presence Tracking**: Know who is actively collaborating in real time.
- **WebSocket-Based Communication**: Efficient and easy-to-implement messaging protocol.
- **Conflict Resolution**: Automatically handle conflicting changes between users.

## Installation

You can install Collaborite via npm:

```bash
npm install collaborite
```
## Usage
Here’s a basic example of how to use Collaborite:

## Server Setup
Create a server to handle WebSocket connections:
```javascript
// src/server.js
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (client) => {
    console.log('A user connected');

    client.on('message', (message) => {
        console.log('Received:', message);

        // Broadcast the message to all clients
        server.clients.forEach((otherClient) => {
            if (otherClient !== client && otherClient.readyState === WebSocket.OPEN) {
                otherClient.send(message);
            }
        });
    });

    client.on('close', () => {
        console.log('A user disconnected');
    });
});

console.log('Collaboration Server started on ws://localhost:8080');
```

## Client Setup
Connect to the Collaborite server and send/receive messages:
```javascript
// src/client.js
const client = new WebSocket('ws://localhost:8080');

client.onopen = () => {
    console.log('Connected to the server');
    
    // Send a message to the server
    client.send(JSON.stringify({ type: 'user-joined', username: 'User1' }));
};

client.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log('Received message:', message);
};
```

## API Reference

- **Server**:
  - `new WebSocket.Server(options)`: Create a new WebSocket server.
  - `server.on('connection', callback)`: Callback for new client connections.
  - `client.on('message', callback)`: Callback for receiving messages from a client.
  - `client.send(data)`: Send a message to the connected client.

- **Client**:
  - `new WebSocket(url)`: Create a new WebSocket client.
  - `client.onopen`: Event triggered when the connection is established.
  - `client.onmessage`: Event triggered when a message is received.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to discuss improvements or fixes.

### Steps to Contribute:

1. Fork the repository.
2. Create your feature branch: 
   ```bash
   git checkout -b feature/YourFeature
3. Commit your changes
   ```bash
   git commit -m 'Add some feature'
4. Push to branch
   ```
   git push origin feature/YourFeature
5. Open a Pull Request
