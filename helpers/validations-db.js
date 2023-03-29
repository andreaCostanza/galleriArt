const { where } = require('sequelize');
const User = require('../models/user');



// const isValidRole = async (role = '') => {
//     const roleExists = await Role.findOne({ role });
//     if ( !roleExists ){
//         throw new Error(`El rol ${ role } no esta registrado en la BD`)
//     }
// };
const userExistsById = async ( id ) => {
    const userExists = await User.findByPk( id );
    if ( !userExists ) {
         throw new Error(`El usuario con id ${ id } no existe`);
    };
};

const emailExists = async ( email = '' ) => {
    const findEmail = await User.findOne({where: { email }});
    if ( findEmail ) {
        throw new Error(`El correo ${ email } ya esta registrado`);
    } else { return }
};

const usernameExists = async ( username = '' ) => {
    const findUsername = await User.findOne({where: { username }});
    if ( findUsername ) {
        throw new Error(`El username ${ username } ya existe`);
    } else { return }
};






module.exports = {
    emailExists,
    userExistsById,
    usernameExists
}