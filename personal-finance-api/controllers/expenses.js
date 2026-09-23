const mongodb = require('../config/db');
const { ObjectId } = require('mongodb');
const validator = require('validator');

// GET all expenses
const getAllExpenses = async (req, res) => {
  const result = await mongodb.getDb().db().collection('expenses').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

// GET a single expense by ID
const getSingleExpense = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid expense ID to locate the item.' });
  }
  const expenseId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('expenses').find({ _id: expenseId });
  result.toArray().then((lists) => {
    if (lists.length === 0) {
      return res.status(404).json({ message: 'Expense record not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

// POST create a new expense
const createExpense = async (req, res) => {
  if (!req.body.concept || !req.body.amount || !req.body.category || !req.body.date || !req.body.paymentMethod) {
    return res.status(400).json({ message: 'Validation failed: Missing required fields.' });
  }

  if (!validator.isDecimal(req.body.amount.toString())) {
    return res.status(400).json({ message: 'Validation failed: Amount must be a valid number.' });
  }
  if (!validator.isISO8601(req.body.date)) {
    return res.status(400).json({ message: 'Validation failed: Date must match a valid ISO YYYY-MM-DD format.' });
  }

  const newExpense = {
    concept: req.body.concept,
    amount: parseFloat(req.body.amount),
    category: req.body.category,
    date: new Date(req.body.date),
    paymentMethod: req.body.paymentMethod,
    notes: req.body.notes || '',
    tags: req.body.tags || [],
    userId: req.body.userId || 'anonymous'
  };
  
  const response = await mongodb.getDb().db().collection('expenses').insertOne(newExpense);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json({ message: 'Some error occurred while creating the transaction entry.' });
  }
};

// PUT modify an existing expense by ID
const updateExpense = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid expense ID to perform an update.' });
  }

  if (!req.body.concept || !req.body.amount || !req.body.category || !req.body.date || !req.body.paymentMethod) {
    return res.status(400).json({ message: 'Validation failed: Missing required fields for update.' });
  }

  if (!validator.isDecimal(req.body.amount.toString())) {
    return res.status(400).json({ message: 'Validation failed: Amount must be a valid number.' });
  }
  if (!validator.isISO8601(req.body.date)) {
    return res.status(400).json({ message: 'Validation failed: Date must match a valid ISO YYYY-MM-DD format.' });
  }

  const expenseId = new ObjectId(req.params.id);
  const updatedExpense = {
    concept: req.body.concept,
    amount: parseFloat(req.body.amount),
    category: req.body.category,
    date: new Date(req.body.date),
    paymentMethod: req.body.paymentMethod,
    notes: req.body.notes || '',
    tags: req.body.tags || [],
    userId: req.body.userId || 'anonymous'
  };

  const response = await mongodb.getDb().db().collection('expenses').replaceOne({ _id: expenseId }, updatedExpense);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json({ message: 'An issue occurred during updates or no unique state shifts occurred.' });
  }
};

// DELETE an expense by ID
const deleteExpense = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid expense ID to trigger removal actions.' });
  }
  const expenseId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('expenses').deleteOne({ _id: expenseId });
  if (response.deletedCount > 0) {
    res.status(200).json({ message: 'Target entry dropped successfully.' });
  } else {
    res.status(500).json({ message: 'Target drop command failed or instance reference key missing.' });
  }
};

module.exports = { getAllExpenses, getSingleExpense, createExpense, updateExpense, deleteExpense };
