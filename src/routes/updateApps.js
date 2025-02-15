const express = require("express");
const Application = require("../models/applications"); // 确保路径正确

const router = express.Router();

// 更新应用的API
router.put("/", async (req, res) => {
  const { id, updateData } = req.body; // 从请求体中获取id和更新数据
  if (!id || !updateData) {
    return res.status(400).json({ message: "ID and update data are required" });
  }

  try {
    const result = await Application.findByIdAndUpdate(id, updateData, { new: true });
    if (!result) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ message: "Application updated successfully", data: result });
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
