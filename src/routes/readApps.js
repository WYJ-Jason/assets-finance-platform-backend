const express = require("express");
const router = express.Router();
const AppModel = require("../models/applications");

router.get("/", async (req, res) => {
  const { email } = req.body;

  try {
    let apps;
    if (email) {
      apps = await AppModel.find({ "personalDetails.email": email });
    } else {
      apps = await AppModel.find();
    }

    if (apps.length === 0) {
      return res.json({ message: "No Applications" });
    }

    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: "Error:", error: error.message });
  }
});

module.exports = router; 