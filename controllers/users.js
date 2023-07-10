const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const randomID = require('../helpers/random-id');



const getUsers = async (req = request, res = response) => {
    
    const users = await User.findAll({ where: { del_status: false } });
     
    res.json({
        msg: 'get users API - controller',
        users
    });
}

const getUserById = async (req = request, res = response) => {
    
    const { id } = req.params;

    const user = await User.findByPk( id );
    
    res.json({
        msg: 'get by id API - controller',
        user
    });
    
}

// Crea usuario
const postUser = async (req, res) => {
    
    const data = req.body;
    
    const user = new User({uid: randomID(), ...data});

    const salt = bcrypt.genSaltSync(); //Hash contraseña
    user.pass = bcrypt.hashSync( data.pass, salt);


    await user.save();

    res.json({
        msg: 'post API - usuario creado',
        user
    })
}

    

const putUser = async (req, res) => {
    
    const { id } = req.params;
    const { body } = req;
    
 
    const user = await User.findByPk( id );
    
    if ( body.pass ) { // Hash contraseña
        
        const salt = bcrypt.genSaltSync();
        body.pass = bcrypt.hashSync( body.pass, salt);
    }

    await user.update( body );

    res.json({
        msg: 'put API - usuario actualizado',
        user
    });

}

const changeBanStatus = async (req, res) =>{
    
    const { id } = req.params;
    const user = await User.findByPk( id );
    if ( !user ) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id' + id
        });
    };

    const { ban } = user;
    let msg = ''
    
    if ( !ban ){
        msg = `Has baneado al usuario: ${ user.username }`;
        await user.update({ ban: true });
    } else {
        msg = `Has des-baneado al usuario: ${ user.username }`
        await user.update({ ban: false });
    }

    res.json({
        msg,
        user
    })

}

const deleteUsers = async (req, res) => {
    
    const { id } = req.params;

    const user = await User.findByPk( id );
    
    
    // user.destroy() elimina el usuario permanentemente

    /* No haremos eliminación permanente para mantener la integridad de la BD. 
    ** En su lugar tenemos el atributo del_status, si está en true significa que el usuario ha sido "borrado"
    ** de nuestra aplicación y no aparecerá cuando hagamos el get de los usuarios*/
    await user.update({ del_status: true });

    res.json({
        msg: 'delete API - controller',
        user
    });
}

module.exports = {
    getUsers,
    getUserById,
    postUser,
    putUser,
    changeBanStatus,
    deleteUsers,
    //getUserByUsername
}