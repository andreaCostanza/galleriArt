
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers,
        putUser,
        deleteUsers, 
        getUserById,
        postUser,
        changeBanStatus} = require('../controllers/users');

const validateFields = require('../helpers/validate-fields');
const { userExistsById, 
        emailExists, 
        usernameExists } = require('../helpers/validations-db');

const router = Router();

router.get('/', getUsers);

router.get('/:id', [
    check( 'id', 'No es un id válido' ).isUUID(),
    check( 'id' ).custom( userExistsById ),
    validateFields
] ,getUserById);

router.post('/', [
    check( 'first_name', 'El nombre es obligatorio' ).notEmpty(),
    check( 'last_name', 'El apellido es obligatorio' ).notEmpty(),
    check( 'username', 'El username es obligatorio' ).notEmpty(),
    check( 'email', 'El email es obligatorio' ).notEmpty(),
    check( 'pass', 'La contraseña debe tener más de 6 caracteres' ).isLength({ min: 6}),
    check( 'email', 'El email no es válido' ).isEmail(),
    check( 'email' ).custom( emailExists ),
    check( 'username' ).custom( usernameExists ),
    validateFields
], postUser);

router.put('/:id', [
    check( 'id', 'No es un id válido' ).isUUID(),
    check( 'id' ).custom( userExistsById ),
    check( 'email', 'El email no es válido' ).custom( emailExists ).isEmail(),
    check( 'username' ).custom( usernameExists ),
    validateFields
], putUser);

router.delete('/:id', [ 
    check( 'id', 'No es un id válido' ).isUUID(),
    check( 'id' ).custom( userExistsById )
], deleteUsers);

router.put('/ban/:id', changeBanStatus);







module.exports = router;