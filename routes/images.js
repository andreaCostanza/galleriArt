const { Router } = require('express');
const { postImage } = require('../controllers/images');
const { uploadFile } = require('../helpers');
const multer = require('multer');


const router = Router();

router.post( '/upload',
    uploadFile.single('image'), postImage);



module.exports = router;