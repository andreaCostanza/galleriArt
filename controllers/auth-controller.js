const { response } = require("express");
const bcrypt = require('bcryptjs');
const User = require('../models/user')

const {
    generateJWT,
} = require('../helpers');
const { where } = require("sequelize");


const login = async (req, res = response ) => {

    const { email, pass } = req.body;
    
    

    try {

        const user = await User.findOne( {where: {email} } );

        if ( !user ) {
            return res.status(400).json({
                msg: 'El correo es incorrecto - no existe // from controller/auth'
            });
        };

        
        // verificar status del usuario
        const status = user.del_status;

        if ( status ) {
            return res.status(400).json({
                msg: 'El usuario no existe - del_status:true'
            });
        };

        // Verificar contraseña
        const validPass = bcrypt.compareSync( pass, user.pass );
        if( !validPass ) {
            return res.status(400).json({
                msg: 'La password no es correcta'
            });
        }

        //generar JWT
        const token = await generateJWT( user.uid );

        res.json({
            user,
            token
        })

        
    } catch (error) {
        console.log( error );
        return res.status(500).json({
            msg: 'Algo salió mal'
        });
    }

    
};

module.exports = {
    login
}