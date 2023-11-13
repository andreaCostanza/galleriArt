const { response } = require("express");

const isAdmin = ( req, res = response, next ) => {

    if ( !req.user ) {
        return res.status(400).json({
            msg: 'Token no valido - ha expirado o no se ha iniciado sesión'
        });
    }

    const { admin, username } = req.user;

    if ( !admin ){
        return res.status(401).json({
            msg: `No autorizado - ${ username } no es administrador`
        });
    };

    next();
}


const banAndDelGuard = ( req, res, next ) => {

    const { ban, del_status } = req.body;

    if ( ban || del_status ) {
        return res.status(401).json({
            msg: 'No tienes permiso para modificar estos parámetros'
        });
    } else {
        next();
    }


}

module.exports = {isAdmin, banAndDelGuard};