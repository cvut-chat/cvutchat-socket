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
        // TODO Send message to room channel (1 ws channel per room)
        clientSocket.send(JSON.stringify(messageToSend));
    } else {
        console.log(`Client with token ${token} not found`);
    }
}

wss.on('connection', (ws, req) => {
    let token;

    ws.on('message', (message) => {
        try {
            token = req.headers.token;
            console.log(`Token: ${token}`);
            clients[token] = ws;
            console.log(`Client connected with token: ${token}`);
        } catch (error) {
            console.error('Not authorized, token failed');
            ws.close();
            return;
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
