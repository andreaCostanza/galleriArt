const { response } = require("express");

const isAdmin = ( req, res = response, next ) => {

    if ( !req.user ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token'
        });
    }

    const { admin, username } = req.user;

    if ( !admin ){
        return res.status(401).json({
            msg: `No autorizado - ${ username } no es administrador`
        });
    }

    next();
}

module.exports = isAdmin;