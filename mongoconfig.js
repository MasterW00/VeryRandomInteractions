const { MongoClient } = require('mongodb');
const { connection_string } = require('./private/connections.js');

// Replace with your MongoDB connection string
const mongoURI = connection_string;

// Create a MongoDB client
const client = new MongoClient(mongoURI);

let db;

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db(); // Use the default database specified in the connection string
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit the process if the connection fails
    }
}

// Get the database instance
function getDB() {
    if (!db) {
        throw new Error('Database not initialized. Call connectToMongoDB first.');
    }
    return db;
}

module.exports = { connectToMongoDB, getDB };