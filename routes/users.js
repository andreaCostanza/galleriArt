
const { Router } = require('express');
const { getUsers,
        putUser,
        deleteUsers, 
        getUserById,
        postUser} = require('../controllers/users');

const router = Router();

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/', postUser);

router.put('/:id', putUser);

//router.patch('/', usersPatch);

router.delete('/', deleteUsers);







module.exports = router;