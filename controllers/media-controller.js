const { response, request } = require('express');
const { unlink } = require('fs');


const Media = require('../models/media-model');

const randomID = require('../helpers/random-id');

// saves file path to DB
const savePicture = async ( req = request, res = response, next ) => {

    const file = req.file;
    
    const img = new Media({uid: randomID(), img_path: file.path});

    await img.save();

    const imgUid = img.uid;

    req.img = imgUid;

    next();
}



const updateProfilePic = async ( req = request, res = response ) => {
    
    // saves the new image to DB
    const file = req.file;
    
    const img = new Media({uid: randomID(), img_path: file.path});

    await img.save();
    
    
    // updates image linked to user
    const img_fk = img.uid;
    
    const user = req.user;
    const prev_img = await Media.findByPk( user.img_fk );

    await user.update({ img_fk });


    const check = prev_img.uid.match( process.env.DEFAULTIMGID ); //check if the previous profile pic is the default pic

    if ( !check ) { // if check null, erase previous picture from directory and DB
        
        try {
            unlink( prev_img.img_path, (err) => {
                if (err) throw err;
                console.log(`${prev_img.img_path} was deleted from fs`);
            });
            await Media.destroy( {where: {uid: prev_img.uid }} );
        } catch (error) {
            console.log( error )
            res.json({
                msg: "Previous picture could not be deleted from DB."
            })
        }
    }

    res.json({
        msg: 'Profile pic updated!',
        img
    });

};




module.exports = {
    savePicture,
    updateProfilePic
}