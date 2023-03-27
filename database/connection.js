const { Sequelize } = require('sequelize');


const db = new Sequelize('gadb', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = db;