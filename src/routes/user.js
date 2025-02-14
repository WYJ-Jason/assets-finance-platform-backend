const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "User - Hello from Express on Lambda!" });
});

module.exports = router; 