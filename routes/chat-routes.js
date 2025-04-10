const express = require('express');
const router = express.Router();
const { getDB } = require('../mongoconfig'); // Import the database instance

// GET route to fetch messages for a specific room
router.get('/messages', async (req, res) => {
    const room = req.query.room;

    if (!room || room.trim() === '') {
        return res.status(400).json({ error: 'Room name is required' });
    }
    try {
        const db = getDB();
        const messages = await db.collection(room).find().toArray(); // Fetch all messages for the room
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST route to add a message to a specific room
router.post('/messages', async (req, res) => {
    const room = req.query.room;
    const { message, sender } = req.body;

    if (!room || room.trim() === '') {
        return res.status(400).json({ error: 'Room name is required' });
    }

    if (!message || !sender) {
        return res.status(400).json({ error: 'Invalid message format. "message" and "sender" are required.' });
    }

    try {
        const db = getDB();
        const newMessage = { message, sender, timestamp: new Date() };
        await db.collection(room).insertOne(newMessage); // Insert the message into the room's collection
        res.status(201).json({ message: 'Message added successfully' });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;