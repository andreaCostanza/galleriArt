const { DataTypes } = require('sequelize');

const db = require('../database/connection');

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


module.exports = Media;