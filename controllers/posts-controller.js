const { response, request } = require('express');
const Post = require('../models/post' );
//const Media = require( '../models/media-model' );

const randomID = require('../helpers/random-id');
const { userExistsById } = require('../helpers');


//Crea post
const createPost = async ( req = request, res = response  ) => {

    const data = req.body;
    const user_fk = req.user.uid;
    const { img_fk } = req;

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

const deletePost = async (req, res) => {
    
    const { id } = req.params;

    const post = await Post.findByPk( id );
    

    await post.update({ del_status: true });

    res.json({
        msg: 'el post ha sido eliminado correctamente',
        post
    });
}

const getUserPosts = async (req, res) => {

    const user_id = req.params.id;
    const postOwner = await userExistsById( user_id );

    try {
            const postsCollection = await postOwner.getPosts({
                where: {
                    del_status: false
                },
                order: [ ['creation_date', 'DESC'] ]
            });

            const isArrayEmpty = postsCollection.length;

            if ( isArrayEmpty === 0 ) {
                
                res.json({ msg: `${ postOwner.username } doesn't have any posts yet!` });

                } else {

                    for (let i = 0; i < postsCollection.length; i++) {
                        
                        const post = postsCollection[i];
                        const postImg = await post.getMedium();
                        post.dataValues.img_path = postImg.img_path;
                    }

                    res.json({
                        msg: `${ postOwner.username }'s posts by creation date:`,
                        postOwner,
                        postsCollection
                    });
                }
    } catch (error) {
        console.log(error);
        res.json({
            msg: `something went wrong`
        });
    }


    

}


module.exports = {createPost, deletePost, getUserPosts};

