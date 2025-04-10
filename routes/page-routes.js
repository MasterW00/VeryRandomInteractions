const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..' ,'views', 'index.html'));
});

router.get('/chat', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..' ,'views', 'chatrooms.html'));
});

router.get('/game', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..' ,'Wang', 'wang.html'));
});

router.get('/v-insta-g', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..' ,'views', 'miami.html'));
});

module.exports = router;