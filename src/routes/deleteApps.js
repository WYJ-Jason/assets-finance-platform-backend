const express = require("express");
const mongoose = require("mongoose");
const Application = require("../models/applications");

const router = express.Router();

router.delete("/", async (req, res) => {
  const { id } = req.body; 
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    const result = await Application.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
