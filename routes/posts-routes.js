const { Router } = require('express');
const multer = require('multer');

const { check } = require('express-validator');
const { validateJWT, uploadFile } = require('../helpers');
const { savePicture } = require('../controllers/media-controller');
const { createPost } = require('../controllers/posts-controller');


const router = Router();

// TODO: add checks middleware
router.post( '/', [
    validateJWT,
    uploadFile.single('image'),
    savePicture
], createPost);




module.exports = router;