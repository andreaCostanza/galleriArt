const { response } = require("express");
const bcrypt = require('bcryptjs');

const {
    generateJWT,
    getUserEmail
} = require('../helpers')


const login = async (req, res = response ) => {

    const { email, pass } = req.body;

    try {

        // verificar si email existe
        const user = await getUserEmail( email, false );
        
        if ( !user ) {
            return res.status(400).json({
                msg: 'El correo no es correcto - no está registrado'
            });
        };
        //verificar status del usuario
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