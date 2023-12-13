const { DataTypes } = require('sequelize');
const Media = require('./media-model');
const User = require('./user');

const db = require('../database/connection');

const Post = db.define('Post', {
    uid: { // id personalizado de sequelize
        type: DataTypes.STRING,
        field: 'post_id',
        primaryKey: true,
        autoIncrement: false
    },
    title: {
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

User.hasMany(Post, {
    foreignKey: 'user_fk'
});
//Post.belongsTo(User);

Post.belongsTo(Media, {
    foreignKey: 'img_fk'
});
//Post.belongsTo(Media);


module.exports = Post;