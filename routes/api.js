const express = require('express');
const router = express.Router();
const {sendDataToClient} = require('../webSocket');

router.post('/rooms/:roomId/messages/send', asyncHandler(async (req, res) => {
    const { data } = req.body;
    const { roomId } = req.params;
    const token = req.headers['authorization'];
    data.IRoom._id = roomId;
    sendDataToClient(token, data);
    res.status(200).json(response);
}));
