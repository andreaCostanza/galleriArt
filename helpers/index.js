// exportaciones de todos los middlewares de la carpeta helpers

const validateFields = require('./validate-fields');
const validateJWT = require('./validate-jwt');
const generateJWT = require('./generate-jwt');
const isAdmin = require('./validate-role');
const validationsDB = require('./validations-db');
const uploadFile = require('./file-storage-engine');


module.exports = {
    validateFields,
    validateJWT,
    generateJWT,
    isAdmin,
    uploadFile,
    ...validationsDB
}