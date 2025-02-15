const express = require("express");
const router = express.Router();
const Applications = require("../models/applications"); // 引入 App 模型

// 创建新的 App
router.post("/", async (req, res) => {
    const { personalDetails, income, expenses, assets, liabilities } = req.body; // 从请求体中获取数据
    try {
        const newApp = new Applications({ // 创建新的 App 实例
            personalDetails,
            income,
            expenses,
            assets,
            liabilities
        });
        await newApp.save(); // 保存到 MongoDB
        res.status(201).json(newApp); // 返回创建的 App
    } catch (error) {
        res.status(500).json({ message: "Error:", error: error.message }); // 返回详细错误信息
    }
});

module.exports = router;
