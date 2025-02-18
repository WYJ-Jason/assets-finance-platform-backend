const express = require('express');
const router = express.Router();
const Applications = require('../models/applications');

router.post('/', async (req, res) => {
  const { personalDetails, income, expenses, assets, liabilities } = req.body;
  try {
    const newApp = new Applications({
      personalDetails,
      income,
      expenses,
      assets,
      liabilities,
    });
    await newApp.save();
    res.status(201).json(newApp);
  } catch (error) {
    res.status(500).json({ message: 'Error:', error: error.message });
  }
});

module.exports = router;
