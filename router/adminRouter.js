const express = require('express');
const {
	crearProducto,
	listaProductos,
	editarProducto,
	eliminarProducto,
	listaUsuarios,
} = require('../controllers/adminControllers');
const routerAdmin = express.Router();

routerAdmin.post('/crearProducto', crearProducto);

routerAdmin.get('/productos', listaProductos);

routerAdmin.put('/editarProducto', editarProducto);

routerAdmin.delete('/eliminar/:id', eliminarProducto);

routerAdmin.get('/usuarios', listaUsuarios);

module.exports = routerAdmin;
