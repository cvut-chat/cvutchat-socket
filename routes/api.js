const express = require('express');
const router = express.Router();
const {sendDataToClient} = require('../webSocket');

router.post('/sendTo', asyncHandler(async (req, res) => {
    const { data } = req.body;
    const token = req.headers['authorization'];
    sendDataToClient(token, data);
    res.status(200).json(response);
}));
