const { Router } = require('express');
const { postImage } = require('../controllers/media-controller');
const { uploadFile, validateJWT } = require('../helpers');
const multer = require('multer');


const router = Router();

router.post( '/upload',
    uploadFile.single('image'),
    validateJWT,
    postImage);



module.exports = router;