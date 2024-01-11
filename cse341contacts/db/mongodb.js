const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const mongo = {};

const uri = 'mongodb+srv://blaketorres2000:kimberly181986@cluster0.p14acrq.mongodb.net/cse341?retryWrites=true&w=majority';
const connectionPromise = mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Export the connection promise and the connectToMongoDB function
mongo.connectionPromise = connectionPromise;
mongo.connectToMongoDB = async function() {
    await connectionPromise;
    return mongoose.connection;
};

connectionPromise
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
});

module.exports = mongo;