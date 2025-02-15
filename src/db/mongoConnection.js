const mongoose = require('mongoose');

const uri = "mongodb+srv://admin:qwer1234@jason-cluster.jgdfw.mongodb.net/assets-finance-platform?retryWrites=true&w=majority&appName=jason-cluster";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function connectDB() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = connectDB; 