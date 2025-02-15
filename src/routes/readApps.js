const express = require("express");
const router = express.Router();
const AppModel = require("../models/applications"); // 确保路径正确

router.get("/", async (req, res) => {
  try {
    const apps = await AppModel.find(); // 查询数据

    if (apps.length === 0) {
      return res.json({ message: "No Applications" }); // 数据为空时的响应
    }

    res.json(apps); // 返回查询到的数据
  } catch (error) {
    res.status(500).json({ message: "Error:", error: error.message }); // 返回错误信息
  }
});

module.exports = router; 