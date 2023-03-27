const { response, request } = require('express');

const User = require('../models/user');
const randomID = require('../helpers/random-id')


const getUsers = async (req = request, res = response) => {
    
    const users = await User.findAll();

    res.json({
        msg: 'get API - controller',
        users
    });
}

const getUserById = async (req = request, res = response) => {
    
    const { id } = req.params;

    const user = await User.findByPk( id );

    if ( user ){
        res.json({
            msg: 'get by id API - controller',
            user
        });
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id: ${id}`
        });
    };
    
}

const postUser = async (req, res) => {
    // TODO:  separar validaciones, hash constrasena
    const { body } = req;
    //const id_user = randomID();
    try {

        const checkUsernameEmail = await User.findOne({
            where: {
                email: body.email,
                username: body.username
            }
        });

        if ( checkUsernameEmail ) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con ese email o username'
            });
        };

        const user = new User({id_user: randomID(), ...body});
        await user.save();

        res.json({
            msg: 'post API - usuario creado',
            user
        })


        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor',
        });
    }


    
}

const putUser = async (req, res) => {
    
    const { id } = req.params;
    const { body } = req;
    
    try {

        const user = await User.findByPk( id );

        if ( !user ) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id' + id
            });
        };

        
        await user.update( body );

        res.json({
            msg: 'put API - usuario actualizado',
            user
        })


        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor',
        });
    }
}

// const usersPatch = (req, res) => {
//     res.json({
//         msg: 'patch API - controller'
//     });
// }

const deleteUsers = (req, res) => {
    res.json({
        msg: 'delete API - controller'
    });
}

module.exports = {
    getUsers,
    getUserById,
    postUser,
    putUser,
    deleteUsers
}