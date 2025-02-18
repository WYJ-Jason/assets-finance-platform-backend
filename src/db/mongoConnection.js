const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

console.log('MONGO_URI:', process.env.MONGODB_URI);

const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
  // 添加连接超时设置
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000,
  // 设置更长的缓冲超时时间
  bufferTimeoutMS: 30000,
};

async function connectDB() {
  try {
    // 确保之前的连接已关闭
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }

    // 创建新连接
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');

    // 添加错误处理
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // 抛出错误以便上层捕获
  }
}

module.exports = connectDB;
