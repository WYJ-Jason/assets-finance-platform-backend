const express = require('express');
const router = express.Router();
const AppModel = require('../models/applications');

// Route handler for GET requests to fetch application(s)
router.get('/', async (req, res) => {
  // Extract email and id from query parameters
  const email = req.query.email;
  const id = req.query.id;

  // Validate that at least one query parameter is provided
  if (!email && !id) {
    return res.status(400).json({ message: 'Either email or id parameter is required' });
  }

  try {
    let apps;
    // Set query options with a timeout of 20 seconds to prevent long-running queries
    const queryOptions = { maxTimeMS: 20000 };

    // Handle case when searching by application ID
    if (id) {
      console.log('Searching for id:', id);
      // Find application by ID with timeout
      apps = await AppModel.findById(id).maxTimeMS(20000);

      // If no application found with the given ID
      if (!apps) {
        return res.status(404).json({ message: 'Application Not Found' });
      }
      // Return the found application
      return res.json(apps);
    }

    // Handle case when searching by email
    if (email) {
      console.log('Searching for email:', email);
      // Find all applications associated with the given email
      apps = await AppModel.find({ 'personalDetails.email': email }, null, queryOptions);

      console.log('Query result count:', apps.length);
    }

    // If no applications found for the given email
    if (apps.length === 0) {
      return res.status(404).json({ message: 'No Applications Found' });
    }

    // Return the found applications
    res.json(apps);
  } catch (error) {
    console.error('Error in readApps:', error);
    // Create appropriate error message based on error type
    const errorMessage =
      error.name === 'MongooseError'
        ? 'Database operation timed out. Please try again.'
        : 'An error occurred while fetching applications.';

    // Return error response with detailed information
    res.status(500).json({
      message: errorMessage,
      error: error.message,
      type: error.name,
    });
  }
});

module.exports = router;
