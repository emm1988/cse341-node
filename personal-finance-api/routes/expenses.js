const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

// Import the expenses controller
const expensesController = require('../controllers/expenses');
const { handleErrors } = require('../middleware/errorHandler');

// CRUD
router.get('/', handleErrors(expensesController.getAllExpenses));
router.get('/:id', handleErrors(expensesController.getSingleExpense));
router.post('/', validation.saveExpense, handleErrors(expensesController.createExpense));
router.put('/:id', validation.saveExpense, handleErrors(expensesController.updateExpense));
router.delete('/:id', handleErrors(expensesController.deleteExpense));

module.exports = router;

