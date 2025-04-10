const express = require('express');
const router = express.Router();
const { getDB } = require('../mongoconfig'); // Import MongoDB connection

// GET route to fetch all image URLs
router.get('/images', async (req, res) => {
    try {
        const db = getDB();
        const images = await db.collection('images').find().toArray(); // Fetch all image URLs
        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST route to add a new image URL
router.post('/images', async (req, res) => {
    const { url } = req.body;

    if (!url || !url.trim()) {
        return res.status(400).json({ error: 'Image URL is required' });
    }

    try {
        const db = getDB();
        await db.collection('images').insertOne({ url }); // Insert the image URL into the database
        res.status(201).json({ message: 'Image added successfully' });
    } catch (error) {
        console.error('Error adding image:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;