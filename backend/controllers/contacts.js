
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Function to get all contacts
const getAll = async (req, res, next) => {
    try {
        const result = await mongodb.getDb().db('CSE341').collection('contacts').find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Function to get a single contact by ID
const getSingle = async (req, res, next) => {
    try {
        const contactId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db('CSE341').collection('contacts').find({ _id: contactId });
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]); 
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// function to create a new contact
const createContact = async (req, res) => {
    try {
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday,
        };
        const response = await mongodb.getDb().db('CSE341').collection('contacts').insertOne(contact);
        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json({ message: 'Failed to create contact' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//function to update a contact by ID
const updateContact = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ err: 'Invalid contact ID' });
            return;
        }
        const userId = new ObjectId(req.params.id);
        const updateContact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday,
        };
        const response = await mongodb.getDb().db('CSE341').collection('contacts').replaceOne({ _id: userId }, updateContact);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//function to delete a contact by ID
const deleteContact = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ err: 'Invalid contact ID' });
        }
        const usedId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().db('CSE341').collection('contacts').deleteOne({ _id: usedId });
        if (response.deletedCount > 0) {
            res.status(204).json({ message: 'Contact deleted successfully' });
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
