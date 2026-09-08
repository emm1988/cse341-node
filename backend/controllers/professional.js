// Read the user data from the local JSON file
const userData = require('../user.json');

const getData = async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(userData[0]); // Json data is sent directly from the local file
};

module.exports = { getData };