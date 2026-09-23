
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// 1 GET ALL CONTACTS
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    }).catch(err => {
      res.status(400).json({ message: err.message || 'Some error occurred while retrieving contacts.' });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2 GET SINGLE CONTACT
const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid contact id to find a contact.' });
  }
  
  const userId = new ObjectId(req.params.id);
  try {
    const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    }).catch(err => {
      res.status(400).json({ message: err.message });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3 CREATE CONTACT
const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  
  const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json({ message: 'Some error occurred while creating the contact.' });
  }
};

// 4 UPDATE CONTACT
const updateContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid contact id to update a contact.' });
  }
  
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  
  const response = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: userId }, contact);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json({ message: 'Some error occurred while updating the contact.' });
  }
};

// 5 DELETE CONTACT
const deleteContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid contact id to delete a contact.' });
  }
  
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json({ message: 'Some error occurred while deleting the contact.' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};

