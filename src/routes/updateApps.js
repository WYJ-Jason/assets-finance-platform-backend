// Import required modules
const express = require('express');
const Application = require('../models/applications');

// Create an Express router instance
const router = express.Router();

// Define PUT route for updating applications
router.put('/', async (req, res) => {
  // Destructure id and updateData from request body
  const { id, updateData } = req.body;
  
  // Validate that both id and updateData are provided
  if (!id || !updateData) {
    return res.status(400).json({ message: 'ID and update data are required' });
  }

  try {
    // Attempt to find and update the application document
    // { new: true } option returns the updated document
    const result = await Application.findByIdAndUpdate(id, updateData, { new: true });
    
    // If no document was found with the provided ID
    if (!result) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // If update was successful, return success response with updated data
    res.status(200).json({ message: 'Application updated successfully', data: result });
  } catch (error) {
    // Log and handle any errors that occur during the update process
    console.error('Error updating application:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Export the router for use in other parts of the application
module.exports = router;
