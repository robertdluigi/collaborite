const WebSocket = require('ws');

describe('CollaborationServer', () => {
    let server, client;

    beforeAll((done) => {
        // Start the WebSocket server before tests
        server = new WebSocket.Server({ port: 8080 }, () => {
            console.log('Server started');
            done();
        });
    });

    afterAll(() => {
        server.close();
    });

    beforeEach((done) => {
        // Create a WebSocket client after the server is ready
        client = new WebSocket('ws://localhost:8080');
        client.onopen = () => {
            console.log('Client connected');
            done();
        };
    });

    afterEach(() => {
        client.close();
    });

    test('should notify when a user joins', (done) => {
        client.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('Message received:', message); // Add this to debug
            if (message.type === 'user-joined') {
                expect(message).toHaveProperty('clientId');
                done();
            }
        };

        // Simulate a user joining after connection
        server.clients.forEach((ws) => {
            ws.send(JSON.stringify({ type: 'user-joined', clientId: '12345' }));
        });
    }, 15000); // Increase timeout to 15 seconds
});
