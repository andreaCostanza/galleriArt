# galleriArt app API



## Initial configuration

Run ```npm install``` to install Node modules.

**Environment variables in `.env` file**

+ PORT

+ SECRETORPRIVATEKEY

+ SERVERROUTE

+ DEFAULTIMGID

  

## API endpoints

| Users    |        |         |
|----------|--------|---------|
|endpoint  | method | function|
|_\_\_lh\_\_/api/users_|GET|fetch all users|
|_\_\_lh\_\_/api/users/id_| GET| fetch user by id|
|----------|PUT |updates user info|
|_\_\_lh\_\_/api/users/signup_| POST|creates new user|
|_\_\_lh\_\_/api/users/profile-pic_|POST|changes profile picture|
<br>
<br>

| Auth     |        |         |
|----------|--------|---------|
|endpoint  | method | function|
|_\_\_lh\_\_/api/auth/login_|POST|login|
<br>
<br>

| Posts    |        |         |
|----------|--------|---------|
|endpoint  | method | function|
|_\_\_lh\_\_/api/posts/_| POST|creates new post|
|_\_\_lh\_\_/api/users/:id_|DELETE|changes posts del_status|
|_\_\_lh\_\_/api/users/by-user/:id_|GET|fetch all posts by user|                          


