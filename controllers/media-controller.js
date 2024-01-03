const { response, request } = require('express');
const { unlink } = require('fs');


const Media = require('../models/media-model');

const randomID = require('../helpers/random-id');
const db = require('../database/connection');
const { Op } = require('sequelize');


const getRandomImgs = async ( req = request, res = response ) => {

    const images = await Media.findAll({where: { 
                                                uid: { [Op.not]: process.env.DEFAULTIMGID } 
                                                }, 
                                        order: db.random(), 
                                        limit: 5});

    res.json({
        msg: 'imgs fetched correctly',
        images
    })
}



const saveFileToDB = async ( req = request, res = response, next ) => {
    
    // saves the new image to DB
    const file = req.file;
    
    const img = new Media({uid: randomID(), img_path: file.path});

    await img.save();

    console.log('File saved to DB');

    req.img_fk = img.uid;

    next();


};


const updateProfilePic = async ( req, res, next ) => {

    const { img_fk } = req;
    
    const user = req.user;
    const prev_img = await user.getMedium();
    
    await user.setMedium( img_fk );


    const check = prev_img.uid.match( process.env.DEFAULTIMGID ); //check if the previous profile pic is the default pic

    if ( !check ) { // if check null, erase previous picture from directory and DB
        
        try {
            unlink( prev_img.img_path, (err) => {
                if (err) throw err;
                console.log(`${prev_img.img_path} was deleted from fs`);
            });
            await Media.destroy( {where: {uid: prev_img.uid }} );
            console.log('file was deleted from DB');
        } catch (error) {
            console.log( error )
            res.json({
                msg: "Previous picture could not be deleted from DB."
            })
        }
    }

    res.json({
        msg: 'Profile pic updated!',
    });
}




module.exports = {
    saveFileToDB,
    updateProfilePic,
    getRandomImgs
}