const express = require('express');
const {
	crearProducto,
	listaProductos,
	editarProducto,
	eliminarProducto,
	listaUsuarios,
} = require('../controllers/adminControllers');
const { validarJWT } = require('../middleware/validarJWT');
const routerAdmin = express.Router();

routerAdmin.post('/crearProducto', validarJWT, crearProducto);

routerAdmin.get('/productos', validarJWT, listaProductos);

routerAdmin.put('/editarProducto', validarJWT, editarProducto);

routerAdmin.delete('/eliminar/:id', validarJWT, eliminarProducto);

routerAdmin.get('/usuarios', validarJWT, listaUsuarios);

module.exports = routerAdmin;
