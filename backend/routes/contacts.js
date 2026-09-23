const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

// Import the contacts controller
const contactsController = require('../controllers/contacts');

//CRUD 
router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);
router.post('/', validation.saveContact, contactsController.createContact);
router.put('/:id', validation.saveContact, contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
