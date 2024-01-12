const mongoose = require('mongoose');

// Set Mongoose promise to global promise library
mongoose.Promise = global.Promise;

// Object to store MongoDB-related functions
const mongo = {};

// MongoDB connection URI
const uri = 'mongodb+srv://blaketorres2000:kimberly181986@cluster0.p14acrq.mongodb.net/cse341?retryWrites=true&w=majority';

// Connection promise using the URI and required options
const connectionPromise = mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Export the connection promise and the connectToMongoDB function
mongo.connectionPromise = connectionPromise;
mongo.connectToMongoDB = async function() {
    // Wait for the connection promise to resolve before returning the connection
    await connectionPromise;
    return mongoose.connection;
};

// Log successful connection to MongoDB
connectionPromise
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit the application if MongoDB connection fails
    });

module.exports = mongo;
