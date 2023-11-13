
const { Router } = require('express');
const multer = require('multer');
const { check } = require('express-validator');
const { getUsers,
        putUser,
        deleteUsers, 
        getUserById,
        postUser,
        changeBanStatus
} = require('../controllers/users-controller');

const { updateProfilePic } = require('../controllers/media-controller');


const {
    validateFields,
    validateJWT,
    isAdmin,
    userExistsById, 
    emailExist,
    usernameExist,
    banAndDelGuard,
    uploadFile,
} = require('../helpers')

const router = Router();

router.get('/', getUsers);

router.get('/:id', [
    check( 'id', 'No es un id válido' ).isUUID(),
    check( 'id' ).custom( userExistsById ),
    validateFields
], getUserById);

router.post('/signup', [
    check( 'first_name', 'El nombre es obligatorio' ).notEmpty(),
    check( 'last_name', 'El apellido es obligatorio' ).notEmpty(),
    check( 'username', 'El username es obligatorio' ).notEmpty(),
    check( 'email', 'El email es obligatorio' ).notEmpty(),
    check( 'pass', 'La contraseña debe tener más de 6 caracteres' ).isLength({ min: 6}),
    check( 'email', 'El email no es válido' ).isEmail(),
    emailExist,
    usernameExist,
    validateFields
], postUser);

router.put('/:id', [
    validateJWT,
    banAndDelGuard,
    check( 'id', 'No es un id válido' ).isUUID(),
    check( 'id' ).custom( userExistsById ),
    emailExist,
    usernameExist,
    validateFields
], putUser);

router.delete('/:id', [
    validateJWT,
    isAdmin, 
    check( 'id', 'No es un id válido' ).isUUID(),
    check( 'id' ).custom( userExistsById )
], deleteUsers);

router.put('/ban/:id', [
    validateJWT,
    isAdmin
], changeBanStatus);

router.post( '/profile-pic',
    validateJWT,
    uploadFile.single('image'),
    updateProfilePic);





module.exports = router;