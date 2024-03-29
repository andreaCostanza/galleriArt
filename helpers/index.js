// exportaciones de todos los middlewares de la carpeta helpers

const validateFields = require('./validate-fields');
const validateJWT = require('./validate-jwt');
const generateJWT = require('./generate-jwt');
const {isAdmin, banAndDelGuard } = require('./validate-permission');
const validationsDB = require('./validations-user');
const uploadFile = require('./file-storage-engine');


module.exports = {
    validateFields,
    validateJWT,
    generateJWT,
    isAdmin,
    banAndDelGuard,
    uploadFile,
    ...validationsDB
}