const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const expensesController = require('../controllers/expenses');
const { handleErrors } = require('../middleware/errorHandler');
const { isAuthenticated } = require('../middleware/authenticate');

// CRUD routes for expenses
router.get('/', handleErrors(expensesController.getAllExpenses));
router.get('/:id', handleErrors(expensesController.getSingleExpense));

router.post('/', isAuthenticated, validation.saveExpense, (req, res) => {
    // req.body = { concept: "", amount: 0, category: "", date: "", paymentMethod: "", notes: "", tags: [], userId: "" }
    expensesController.createExpense(req, res);
});

router.put('/:id', isAuthenticated, validation.saveExpense, (req, res) => {
    // req.body = { concept: "", amount: 0, category: "", date: "", paymentMethod: "", notes: "", tags: [], userId: "" }
    expensesController.updateExpense(req, res);
});

router.delete('/:id', isAuthenticated, handleErrors(expensesController.deleteExpense));

module.exports = router;



