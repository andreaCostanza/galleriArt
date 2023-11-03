const { DataTypes } = require('sequelize');

const db = require('../database/connection');
const User = require('./user');

const Media = db.define( 'Media', {
    uid: {
        type: DataTypes.STRING,
        field: 'img_id',
        primaryKey: true,
        autoIncrement: false
    },
    img_path: {
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    timestamps: false
});

Media.belongsTo(User);

module.exports = Media;