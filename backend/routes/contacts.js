const express = require('express');
const router = express.Router();

// Import the contacts controller
const contactsController = require('../controllers/contacts');

//CRUD 
router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);
router.post('/', contactsController.createContact);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
