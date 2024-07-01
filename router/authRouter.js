const express = require('express');
const { crearUsuario, loginUsuario } = require('../controllers/authControllers');
const routerAuth = express.Router();

routerAuth.post('/login', loginUsuario);
console.log('hola');
routerAuth.post('/registro', crearUsuario);

module.exports = routerAuth;
