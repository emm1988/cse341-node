const mongodb = require('../config/db');
const { ObjectId } = require('mongodb');

// 1. GET all expenses
const getAllExpenses = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('expenses').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving expenses', error: error.message });
  }
};

// 2. GET a specific expense by id
const getSingleExpense = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving expense record', error: error.message });
  }
};

// 3. POST Create a new expense
const createExpense = async (req, res) => {
  try {
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
      res.status(500).json({ message: 'Some error occurred while executing the transaction entry.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// 4. PUT Modify properties by id
const updateExpense = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid expense ID to perform an update.' });
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
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// 5. DELETE Remove an expense by id
const deleteExpense = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense record', error: error.message });
  }
};

module.exports = {
  getAllExpenses,
  getSingleExpense,
  createExpense,
  updateExpense,
  deleteExpense
};
