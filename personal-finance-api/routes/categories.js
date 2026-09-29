const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const categoriesController = require('../controllers/categories');
const { handleErrors } = require('../middleware/errorHandler');
const { isAuthenticated } = require('../middleware/authenticate');

// CRUD routes for categories
router.get('/', handleErrors(categoriesController.getAllCategories));
router.get('/:id', handleErrors(categoriesController.getSingleCategory));

router.post('/', isAuthenticated, validation.saveCategory, (req, res) => {
    // req.body = { name: "", description: "", color: "" }
    categoriesController.createCategory(req, res);
});

router.put('/:id', isAuthenticated, validation.saveCategory, (req, res) => {
    // req.body = { name: "", description: "", color: "" }
    categoriesController.updateCategory(req, res);
});
router.delete('/:id', isAuthenticated, handleErrors(categoriesController.deleteCategory));

module.exports = router;



