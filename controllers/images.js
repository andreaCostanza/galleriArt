const { response, request } = require('express');


const Media = require('../models/media');

const randomID = require('../helpers/random-id');

// saves file path to DB

const postImage = async ( req = request, res = response ) => {
    
    const file = req.file;
    
    const img = new Media({uid: randomID(), img_path: file.path});
    
    await img.save();

    res.json({
        msg: 'Image uploaded to server succesfully',
        img
    });
};

module.exports = {
    postImage
}