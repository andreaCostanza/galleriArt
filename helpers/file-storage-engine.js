const multer = require('multer');

// sets the destination and name of file

const storage = multer.diskStorage({
    destination: `${process.env.SERVERROUTE}/images`,
    filename: ( req, file, cb ) => {
        cb(null, Date.now() + '--' + file.originalname );
    } 
});

// upload middleware

const uploadFile = multer( { storage });
    


module.exports = uploadFile;