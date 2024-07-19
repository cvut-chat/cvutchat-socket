const express = require('express');
const {sendDataToClient} = require('../webSocket');
const asyncHandler = require('express-async-handler');
const router = express.Router();

router.post('/rooms/:roomId/messages/send', asyncHandler(async (req, res) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
        } catch (error) {
            console.error('Not authorized, token failed');
            res.status(401).json({ message: 'Not authorized, token failed' });
            return;
        }
    }
    const data = req.body;
    sendDataToClient(token, data);
    res.status(200).json({success: true});
}));

module.exports = router;