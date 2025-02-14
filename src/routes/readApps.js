const express = require("express");
const router = express.Router();
const connectDB = require("../db/mongoConnection"); // 引入 MongoDB 连接模块
const AppModel = require("../models/App"); // 确保路径正确

router.get("/", async (req, res) => {
  await connectDB(); // 连接到 MongoDB
  const apps = await AppModel.find(); // 查询数据

  if (apps.length === 0) {
    return res.json({ message: "Apps - Hello from Express on Lambda!" }); // 数据为空时的响应
  }

  res.json(apps); // 返回查询到的数据
});

module.exports = router; 