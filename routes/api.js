const express = require('express');
const {sendDataToClient} = require('../webSocket');
const asyncHandler = require('express-async-handler');
const router = express.Router();

router.post('/rooms/:roomId/messages/send', asyncHandler(async (req, res) => {
    const data = req.body;
    const { roomId } = req.params;
    const token = req.headers['authorization'];
    data.RoomId = roomId;
    sendDataToClient(token, data);
    res.status(200);
}));

module.exports = router;