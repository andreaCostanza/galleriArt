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
    const { username } = await userExistsById( user_id );

    try {
            const postsCollection = await Post.findAll({
                                            where: {
                                                user_fk: user_id,
                                                del_status: false
                                            },
                                            order: ['creation_date', 'DESC']
                                        });
            console.log(postsCollection)

            const emptyArray = postsCollection.length;

            if ( emptyArray === 0 ) {
                
                res.json({ msg: `${username} doesn't have any posts yet!` });

                } else {
                    res.json({
                        msg: `${username}'s posts by creation date:`,
                        username,
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

