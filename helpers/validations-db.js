const { where } = require('sequelize');
const User = require('../models/user');




const userExistsById = async ( id ) => {
    const user = await User.findByPk( id );
    if ( !user ) {
         throw new Error(`El usuario con id ${ id } no existe`);
    } else { return user };
};

// Busca un usuario por el email.
// Por default lanza un error si existe un usuario con ese correo. Si se le pasa el param 'false', devuelve el usuario completo  
const getUserEmail = async ( email = '', throwErr = true ) => {
    const user = await User.findOne({where: { email }});
    
    if ( throwErr ) {
        if ( user ) {
            throw new Error(`El correo ${ email } ya esta registrado`);
        } else { return }
    } else { return user }
};


// Busca un usuario por username.
// Por default lanza un error si ya existe el username. Si se le pasa el param false, devuelve el user
const getUsername = async ( username = '', throwErr = true ) => {
    const user = await User.findOne({where: { username }});
    
    if ( throwErr ) {
        if ( user ) {
            throw new Error(`El username ${ username } ya existe`);
        } else { return }
    } else {
        return user 
    }
};






module.exports = {
    getUserEmail,
    userExistsById,
    getUsername,
}