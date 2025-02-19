// Import required modules
const express = require('express');
const router = express.Router();
const Applications = require('../models/applications');

// POST route for creating new applications
router.post('/', async (req, res) => {
  // Destructure the request body with default empty objects for optional fields
  const { personalDetails, income = {}, expenses = {}, assets = {}, liabilities = {} } = req.body;
  
  try {
    // Create a new application instance using the Applications model
    const newApp = new Applications({
      personalDetails,
      income,
      expenses,
      assets,
      liabilities,
    });
    
    // Save the new application to the database
    await newApp.save();
    
    // Return 201 Created status with the newly created application data
    res.status(201).json(newApp);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ 
      message: 'Error:', 
      error: error.message // Include the error message in the response
    });
  }
});

// Export the router to be used in the main application
module.exports = router;
