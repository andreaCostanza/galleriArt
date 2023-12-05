const express = require('express');
const cors = require('cors');

const db = require('./database/connection');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // PATHS
        this.authPath = '/api/auth';
        this.usersPath = '/api/users';
        this.postsPath = '/api/posts';

        // TODO: añadir otros paths
        
        /******** METODOS INICIALES  ********/

        this.dbConnection(); // Conexion con BD       
        this.middlewares(); // Middlewares
        this.routes(); // Rutas de la aplicacion
    };

    async dbConnection() {

        try {
            
            await db.authenticate();
            console.log('Conexion con la BD establecida')

        } catch (error) {
            throw new Error( 'No se ha podido establecer la conexion con la BD', error );
        }
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // directorio publico
        this.app.use( express.static('public') );
    };

    routes() {

        this.app.use(this.authPath, require('./routes/auth-routes'));
        
        this.app.use(this.usersPath, require('./routes/users-routes'));

        this.app.use(this.postsPath, require('./routes/posts-routes'));
    };

    listen() {

        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en puerto:', this.port );
        });
    };


};

module.exports = Server;