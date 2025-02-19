const mongoose = require('mongoose');

// MongoDB connection URI from environment variables
const uri = process.env.MONGODB_URI;

// Log the MongoDB URI for debugging purposes
console.log('MONGO_URI:', process.env.MONGODB_URI);

// Configuration options for MongoDB client
const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true }, // MongoDB server API configuration
  // Connection timeout settings
  connectTimeoutMS: 30000, // 30 seconds to establish connection
  socketTimeoutMS: 30000, // 30 seconds for socket operations
  // Buffer timeout settings
  bufferTimeoutMS: 30000, // 30 seconds for buffering operations
};

// Main function to connect to MongoDB
async function connectDB() {
  try {
    // Check if there's an existing connection and close it if necessary
    // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }

    // Establish new connection using the URI and options
    await mongoose.connect(uri, clientOptions);
    
    // Ping the database to verify the connection
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');

    // Event listener for connection errors
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    // Event listener for when the connection is disconnected
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
  } catch (error) {
    // Handle any errors that occur during the connection process
    console.error('Error connecting to MongoDB:', error);
    throw error; // Re-throw the error for handling by the calling code
  }
}

// Export the connectDB function for use in other modules
module.exports = connectDB;
