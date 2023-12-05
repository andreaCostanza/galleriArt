# galleriArt app
## Conf inicial

Ejecutar ```npm install``` para reconstruir los modulos de Node.

**CONFIGURAR .ENV CON LAS VARIABLES**

+ PORT
+ SECRETORPRIVATEKEY
+ SERVERROUTE
+ DEFAULTIMGID

## API endpoints

    **ENDPOINT**                      **METODO ACEPTADO Y FUNCION**

Users

_localhost/api/users_            --> GET todos los usuarios
                   _/id_         --> GET busca usuario por id
                                     PUT actualiza info usuario
                                     DELETE cambia estado usuario a borrado
                   _/signup_     --> POST crea nuevo usuario
                   _/profile-pic_--> POST actualiza foto perfil

Auth

_localhost/api/auth/login_       --> POST login

Posts

_localhost/api/posts_            --> POST crea nuevo post
                                     


