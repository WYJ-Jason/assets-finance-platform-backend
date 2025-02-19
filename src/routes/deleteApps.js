const express = require('express');
const Application = require('../models/applications');

// Create an Express router instance
const router = express.Router();

// Define DELETE route handler for removing applications
router.delete('/', async (req, res) => {
  // Extract the application ID from the query parameters
  const id = req.query.id;
  
  // Validate if ID is provided
  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }

  try {
    // Attempt to find and delete the application by ID
    const result = await Application.findByIdAndDelete(id);
    
    // If no application was found with the given ID
    if (!result) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // If deletion was successful, return success response
    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (error) {
    // Log and handle any errors that occur during the process
    console.error('Error deleting application:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Export the router to be used in the main application
module.exports = router;
