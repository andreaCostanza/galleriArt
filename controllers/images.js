const { response, request } = require('express');

// TODO: import image model

//const randomID = require('../helpers/random-id');

// saves file path to DB

const postImage = async ( req = request, res = response ) => {
    
    const file = req.file
    // const img = new Image
    // const path = async Image.save()

    res.json({
        msg: 'Image uploaded to server succesfully',
        file
    });
};

module.exports = {
    postImage
}