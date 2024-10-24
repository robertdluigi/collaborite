const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

class CollaborationServer {
    constructor(port = 8080) {
        this.wss = new WebSocket.Server({ port });
        this.clients = new Map();

        this.wss.on('connection', (ws) => {
            const clientId = uuidv4();
            this.clients.set(clientId, ws);

            // Broadcast when a new user connects
            this.broadcast({ type: 'user-joined', clientId });

            ws.on('message', (message) => {
                const data = JSON.parse(message);
                this.handleMessage(clientId, data);
            });

            ws.on('close', () => {
                this.clients.delete(clientId);
                this.broadcast({ type: 'user-left', clientId });
            });
        });

        console.log(`Collaboration Server started on ws://localhost:${port}`);
    }

    broadcast(message) {
        this.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    }

    handleMessage(clientId, data) {
        // Broadcast any received message to all clients
        this.broadcast({
            ...data,
            clientId,
        });
    }
}

module.exports = CollaborationServer;

// Start server on port 8080 if script is run directly
if (require.main === module) {
    new CollaborationServer(8080);
}
