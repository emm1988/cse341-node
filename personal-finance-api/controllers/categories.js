const mongodb = require('../config/db');
const { ObjectId } = require('mongodb');

const getAllCategories = async (req, res) => {
  const result = await mongodb.getDb().db().collection('categories').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingleCategory = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid category ID.' });
  }
  const categoryId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('categories').find({ _id: categoryId });
  result.toArray().then((lists) => {
    if (lists.length === 0) {
      return res.status(404).json({ message: 'Category not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const createCategory = async (req, res) => {
  const newCategory = {
    name: req.body.name,
    description: req.body.description || '',
    color: req.body.color || '#ffffff'
  };
  const response = await mongodb.getDb().db().collection('categories').insertOne(newCategory);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json({ message: 'Error occurred while creating category.' });
  }
};

const updateCategory = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid category ID to update.' });
  }
  const categoryId = new ObjectId(req.params.id);
  const updatedCategory = {
    name: req.body.name,
    description: req.body.description || '',
    color: req.body.color || '#ffffff'
  };
  const response = await mongodb.getDb().db().collection('categories').replaceOne({ _id: categoryId }, updatedCategory);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json({ message: 'Update failed or no changes submitted.' });
  }
};

const deleteCategory = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid category ID to delete.' });
  }
  const categoryId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('categories').deleteOne({ _id: categoryId });
  if (response.deletedCount > 0) {
    res.status(200).json({ message: 'Category deleted successfully.' });
  } else {
    res.status(500).json({ message: 'Delete operation failed.' });
  }
};

module.exports = { getAllCategories, getSingleCategory, createCategory, updateCategory, deleteCategory };
