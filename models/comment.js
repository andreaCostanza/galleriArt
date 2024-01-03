const { DataTypes } = require('sequelize');
const Post = require('./post');
const User = require('./user');

const db = require('../database/connection');

const Comment = db.define('Comment', {
    uid: { // id personalizado de sequelize
        type: DataTypes.STRING,
        field: 'comment_id',
        primaryKey: true,
        autoIncrement: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creation_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    del_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false
});

Post.hasMany(Comment, {
    foreignKey: 'post_fk'
});

Comment.hasOne(User, {
    foreignKey: 'user_fk'
});



module.exports = Comment;