const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const categoriesController = require('../controllers/categories');
const { handleErrors } = require('../middleware/errorHandler');

router.get('/', handleErrors(categoriesController.getAllCategories));
router.get('/:id', handleErrors(categoriesController.getSingleCategory));
router.post('/', validation.saveCategory, handleErrors(categoriesController.createCategory));
router.put('/:id', validation.saveCategory, handleErrors(categoriesController.updateCategory));
router.delete('/:id', handleErrors(categoriesController.deleteCategory));

module.exports = router;

