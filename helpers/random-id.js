const { v4: uuidv4 } = require('uuid');

const randomID = () => uuidv4();

module.exports = randomID;
