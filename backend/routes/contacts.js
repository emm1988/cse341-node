const express = require('express');
const router = express.Router();

// Import the contacts controller
const contactsController = require('../controllers/contacts');

// Route to get all contacts
router.get('/', contactsController.getAll);

// Route to get a single contact by ID
router.get('/:id', contactsController.getSingle);

module.exports = router;