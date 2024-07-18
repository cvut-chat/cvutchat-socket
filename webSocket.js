const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const clients = {};

function sendDataToClient(token, data) {
    const clientSocket = clients[token];
    if (clientSocket) {
        const messageToSend = {
            IMessage:{
                from: data.from,
                room: data.room,
                content: data.content,
                _id: data._idIMessage,
                createdAt: data.createdAtIMessage,
                updatedAt: data.updatedAtIMessage
            },
            IRoom:{
                users: data.users,
                name: data.name,
                _id: data._idIRoom,
                createdAt: data.createdAtIRoom,
                updatedAt: data.updatedAtIRoom
            }
        }
        clientSocket.send(JSON.stringify(messageToSend));
    } else {
        console.log(`Client with token ${token} not found`);
    }
}

wss.on('connection', (ws, req) => {
    let token;

    ws.on('message', (message) => {
        try {
            const parsedMessage = JSON.parse(message);
            if (parsedMessage.type === 'connect' && parsedMessage.token) {
                token = parsedMessage.token;
                clients[token] = ws;
                console.log(`Client connected with token: ${token}`);
            } else {
                console.log(`Received message: ${message}`);
            }
        } catch (e) {
            console.error('Invalid JSON received:', message);
        }
    });

    ws.on('close', () => {
        if (token) {
            delete clients[token];
            console.log(`Client disconnected with token: ${token}`);
        }
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

console.log('WebSocket server started on port 8080');

module.exports = {sendDataToClient};
