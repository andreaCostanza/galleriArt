const { response, request } = require('express');
const Post = require('../models/post' );
//const Media = require( '../models/media-model' );

const randomID = require('../helpers/random-id');


//Crea post
const createPost = async ( req = request, res = response  ) => {

    const data = req.body;
    const user_fk = req.user.uid;
    const img_fk = req.img;

    const post = new Post({
        uid: randomID(),
        user_fk,
        img_fk,
        ...data
    })

    await post.save();

    res.json({
        msg: 'Post created succesfully',
        post
    })

};


module.exports = {createPost};

