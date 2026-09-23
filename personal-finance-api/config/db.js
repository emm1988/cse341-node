const { MongoClient } = require('mongodb');
const dns = require('dns');

// Using Google DNS servers for name resolution
dns.setServers(['8.8.8.8', '8.8.4.4']);

const dotenv = require('dotenv');
dotenv.config();

let _db;

// Initialize connection
const initDb = (callback) => {
  if (_db) {
    console.log('Database is already initialized!');
    return callback(null, _db);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

// Return the database connection
const getDb = () => {
  if (!_db) {
    throw Error('Database has not been initialized');
  }
  return _db;
};

module.exports = { initDb, getDb };
