const { response, request } = require('express');


const Media = require('../models/media-model');

const randomID = require('../helpers/random-id');

// saves file path to DB

const postImage = async ( req = request, res = response ) => {
    
    const file = req.file;
    
    const img = new Media({uid: randomID(), img_path: file.path});

    

    await img.save();
    
    const img_fk = img.uid;
    console.log(img_fk);

    const user = req.user;

    

    await user.update({ img_fk })
    
    console.log(user);
    

    res.json({
        msg: 'Profile pic updated!',
        img
    });
};

module.exports = {
    postImage
}