const express = require('express');
const router = express.Router();
const AppModel = require('../models/applications');

router.get('/', async (req, res) => {
  const email = req.query.email;
  const id = req.query.id;

  if (!email && !id) {
    return res.status(400).json({ message: 'Either email or id parameter is required' });
  }

  try {
    let apps;
    const queryOptions = { maxTimeMS: 20000 };

    if (id) {
      console.log('Searching for id:', id);
      apps = await AppModel.findById(id).maxTimeMS(20000);

      if (!apps) {
        return res.status(404).json({ message: 'Application Not Found' });
      }
      return res.json(apps);
    }

    if (email) {
      console.log('Searching for email:', email);
      apps = await AppModel.find({ 'personalDetails.email': email }, null, queryOptions);

      console.log('Query result count:', apps.length);
    }

    if (apps.length === 0) {
      return res.status(404).json({ message: 'No Applications Found' });
    }

    res.json(apps);
  } catch (error) {
    console.error('Error in readApps:', error);
    const errorMessage =
      error.name === 'MongooseError'
        ? 'Database operation timed out. Please try again.'
        : 'An error occurred while fetching applications.';

    res.status(500).json({
      message: errorMessage,
      error: error.message,
      type: error.name,
    });
  }
});

module.exports = router;
