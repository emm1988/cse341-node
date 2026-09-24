const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const expensesController = require('../controllers/expenses');
const { handleErrors } = require('../middleware/errorHandler');

// CRUD routes for expenses
router.get('/', handleErrors(expensesController.getAllExpenses));
router.get('/:id', handleErrors(expensesController.getSingleExpense));

router.post('/', validation.saveExpense, (req, res) => {
    // req.body = { concept: "", amount: 0, category: "", date: "", paymentMethod: "", notes: "", tags: [], userId: "" }
    expensesController.createExpense(req, res);
});

router.put('/:id', validation.saveExpense, (req, res) => {
    // req.body = { concept: "", amount: 0, category: "", date: "", paymentMethod: "", notes: "", tags: [], userId: "" }
    expensesController.updateExpense(req, res);
});

router.delete('/:id', handleErrors(expensesController.deleteExpense));

module.exports = router;



