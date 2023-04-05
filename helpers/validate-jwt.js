const { response } = require('express');
const jwt = require('jsonwebtoken');
const { userExistsById } = require('./validations-db');

const validateJWT = async ( req, res = response, next ) => {

    const token = req.header( 'x-token' );

    if ( !token ){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // leer el usuario que corresponde al uid
        const user = await userExistsById( uid );

        // verificar si el uid tiene del_status false
        if ( user.del_status ) {
            return res.status(400).json({
                msg: 'Token no válido - del_status:true'
            })
        }


        req.user = user;

        next();

    } catch (error) {
        
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
        
    }

}

module.exports = validateJWT;