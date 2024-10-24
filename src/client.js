class CollaborationClient {
    constructor(serverUrl) {
        this.ws = new WebSocket(serverUrl);
        this.ws.onopen = () => {
            console.log('Connected to collaboration server');
        };

        this.ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            this.handleMessage(message);
        };

        this.ws.onclose = () => {
            console.log('Disconnected from collaboration server');
        };
    }

    handleMessage(message) {
        switch (message.type) {
            case 'user-joined':
                console.log(`User ${message.clientId} joined`);
                break;
            case 'user-left':
                console.log(`User ${message.clientId} left`);
                break;
            case 'edit':
                console.log(`User ${message.clientId} edited document: ${message.content}`);
                break;
            default:
                console.log('Unknown message type', message);
        }
    }

    sendEdit(content) {
        this.ws.send(JSON.stringify({ type: 'edit', content }));
    }
}

module.exports = CollaborationClient;

// Example usage
if (require.main === module) {
    const client = new CollaborationClient('ws://localhost:8080');
    setTimeout(() => client.sendEdit('Hello, world!'), 3000);
}
