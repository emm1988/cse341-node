
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

// Funtion to get a single contact by ID
const getSingle = async (req, res, next) => {
    try {
        const contactId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db('CSE341').collection('contacts').find({ _id: contactId });
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]); // Te entrega solo el objeto limpio
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAll, getSingle };
