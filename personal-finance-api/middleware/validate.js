const validator = require('../helpers/validate');

const saveExpense = (req, res, next) => {
  // Define strict field rules for validationjs
  const validationRule = {
    concept: 'required|string|max:100',
    amount: 'required|numeric',
    category: 'required|string',
    date: 'required|date',
    paymentMethod: 'required|string',
    notes: 'string|max:250',
    tags: 'array',
    userId: 'string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveCategory = (req, res, next) => {
  const validationRule = {
    name: 'required|string|max:50',
    description: 'string|max:150',
    color: 'string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveExpense,
  saveCategory
};
