const express = require('express');
const { connectToMongoDB } = require('./mongoconfig'); // Import the connection function

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(express.json());
app.use('/css',express.static(__dirname + '/css'));
app.use('/data',express.static(__dirname + '/data'));
app.use('/asset',express.static(__dirname + '/asset'));
app.use('/game',express.static(__dirname + '/Wang'));
app.use(express.static(__dirname + '/views'));

// Routes
app.use('/chat', require('./routes/chat-routes'));
app.use('/', require('./routes/page-routes'));
app.use('/v-insta-g', require('./routes/images-routes'));
//app.use('/game', require('./routes/wang-routes'));

// Start the server after connecting to MongoDB
(async () => {
    try {
        await connectToMongoDB(); // Connect to MongoDB
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start the server:', err);
        process.exit(1); // Exit the process if the connection fails
    }
})();