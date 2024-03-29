const jwt = require('jsonwebtoken');


const generateJWT = ( uid = '' ) => {
    
    return new Promise( (resolve,reject ) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '7d' // FIXME: 7d expiration time only for dev purposes
        }, (err, token ) => {

            if ( err ) {
                console.log( err );
                reject( 'No se pudo generar el token' );
            } else {
                resolve( token );
            }
        })
    })
}

module.exports = generateJWT;