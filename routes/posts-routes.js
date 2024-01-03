const { Router } = require('express');
const multer = require('multer');
const { check } = require('express-validator');

const { createPost,
        deletePost, 
        getUserPosts
      } = require('../controllers/posts-controller');

const { saveFileToDB, getRandomImgs } = require('../controllers/media-controller');

const { validateJWT, uploadFile, userExistsById } = require('../helpers');


const router = Router();

router.post( '/', [
    validateJWT,
    uploadFile.single('image'),
    saveFileToDB
], createPost)

router.delete( '/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isUUID()

], deletePost);

router.get( '/by-user/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isUUID(),
    check( 'id' ).custom( userExistsById ),
], getUserPosts);

//TODO: get single post

//TODO: MOVE TO IMG ENDPOINT

router.get('/random-imgs', getRandomImgs)


module.exports = router;