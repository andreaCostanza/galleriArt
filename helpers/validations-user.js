const { where } = require('sequelize');
const { response } = require("express");
const User = require('../models/user');
const Media = require('../models/media-model');

//Middleware

// Comprueba si el usuario existe por id

const userExistsById = async ( id ) => {
    const user = await User.findByPk( id );
    if ( !user ) {
         throw new Error(`El usuario con id ${ id } no existe`);
    } else { return user };
};


// Comprueba si el email existe en la BBDD y lanza un error si ya existe

const emailExist = async ( req, res, next ) => {
    
    const { email } = req.body;

    if ( email ) {
        
        const query = await User.findOne( {where: {email} } );

        if ( query && email == query.email ) {
            res.status(400).json({
                msg: `El correo ${ email } ya esta registrado`
            })
        }; 
    }
    
    next();

};

// Comprueba si el username existe en la BBDD y lanza un error si ya existe

const usernameExist = async ( req, res, next ) => {
    
    const { username } = req.body;

    if ( username ) {
        
        const query = await User.findOne( {where: {username} } );

        if ( query && username == query.username ) {
            res.status(400).json({
                msg: `El correo ${ username } ya esta registrado`
            })
        };
    }
    
    next();

}



// const getUserEmail = async ( email = '', throwErr = true ) => {
//     const user = await User.findOne({where: { email }});
    
//     if ( throwErr ) {
//         if ( user ) {
//             throw new Error(`El correo ${ email } ya esta registrado`);
//         } else { return }
//     } else { return user }
// };


// Busca un usuario por username.
// Por default lanza un error si ya existe el username. Si se le pasa el param false, devuelve el user

// const getUsername = async ( username = '', throwErr = true ) => {
//     const user = await User.findOne({where: { username }});
    
//     if ( throwErr ) {
//         if ( user ) {
//             throw new Error(`El username ${ username } ya existe`);
//         } else { return }
//     } else {
//         return user 
//     }
// };






module.exports = {
    userExistsById,
    emailExist,
    usernameExist
}