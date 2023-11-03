const { DataTypes } = require('sequelize');
const Media = require('./media-model');

const db = require('../database/connection');

const User = db.define('User', {
    uid: { // id personalizado de sequelize
        type: DataTypes.STRING,
        field: 'user_id',
        primaryKey: true,
        autoIncrement: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pass: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    ban: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    del_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    img_fk: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
});

User.hasOne(Media, {
    foreignKey: 'img_fk'
})

module.exports = User;