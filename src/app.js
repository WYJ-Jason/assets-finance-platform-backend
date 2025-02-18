const express = require('express');
const serverless = require('serverless-http');
const readAppsRoutes = require('./routes/readApps');
const createAppsRoutes = require('./routes/createApps');
const deleteAppsRoutes = require('./routes/deleteApps');
const updateAppsRoutes = require('./routes/updateApps');
const connectDB = require('./db/mongoConnection');
const cors = require('cors');
const app = express();

// 确保数据库连接成功后再处理请求
let isConnected = false;

const initializeDB = async () => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (error) {
      console.error('Failed to connect to database:', error);
      throw error;
    }
  }
};

app.use(async (req, res, next) => {
  try {
    await initializeDB();
    next();
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express on Lambda!' });
});

app.use('/read-apps', readAppsRoutes);
app.use('/create-apps', createAppsRoutes);
app.use('/delete-apps', deleteAppsRoutes);
app.use('/update-apps', updateAppsRoutes);

module.exports.handler = serverless(app);
