const productoModel = require('../model/producto-model');
const usuarioModel = require('../model/usuario-model');

const crearProducto = async (req, res) => {
	try {
		const { name, precio, descripcion } = req.body;

		//validaciones
		//...
		//fin de las validaciones

		//opcional verificar si el producto existe o no y ver como lo encaran
		const producto = new productoModel(req.body);

		//guardarlo en la base de datos
		await producto.save();

		res.status(201).json({
			msg: 'Producto creado',
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Error, por favor contactarse con un administrador',
		});
	}
};

const listaProductos = async (req, res) => {
	try {
		//Si al metodo find no le asignamos ningun argumento, me retornara el arreglo con todos los elementos del modelo
		const listaProductos = await productoModel.find();

		res.status(200).json({
			msg: 'lista de productos enviadas',
			//le envio al front toda la lista de productos
			listaProductos,
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Error, por favor contactarse con un administrador',
		});
	}
};

const editarProducto = async (req, res) => {
	try {
		//validaciones
		//...
		//fin de las validaciones

		//buscamos que el producto que quiera editar exista
		const productoEditar = await productoModel.findById(req.body._id);

		//en caso de no existir tiramos un error
		if (!productoEditar) {
			return res.status(400).json({
				msg: 'No existe un producto con este ID',
			});
		}

		//si el producto que quiere editar se encuentra buscamos por el id en toda la lista y remplazamos el valor encontrado por el valor que envio el usuario
		await productoModel.findByIdAndUpdate(req.body._id, req.body);

		res.status(200).json({
			msg: 'producto Editado exitosamente',
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Error, por favor contactarse con un administrador',
		});
	}
};

const eliminarProducto = async (req, res) => {
	try {
		//recibimos por PARAMETRO el id del producto que queremos editar y lo comparamos con todos los id de la base de datos del modelo producto
		const productoEliminar = await productoModel.findById(req.params.id);

		//en caso de que el que queramos eliminar no se encuetre prevenimos el error comunicandoselo
		if (!productoEliminar) {
			return res.status(400).json({
				msg: 'No existe ningun producto con este ID',
			});
		}

		//en caso que el producto que quiera eliminar se encuentre buscamos por y el que coincida lo eliminar de la DB
		await productoModel.findByIdAndDelete(req.params.id);

		res.status(200).json({
			msg: 'productoEliminado',
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Error, por favor contactarse con un administrador',
		});
	}
};

const listaUsuarios = async (req, res) => {
	try {
		const listaUsuarios = await usuarioModel.find();

		res.status(200).json({
			msg: 'lista de usuarios enviadas',
			//le envio al front toda la lista de usuarios
			listaUsuarios,
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Error, por favor contactarse con un administrador',
		});
	}
};

module.exports = {
	crearProducto,
	listaProductos,
	editarProducto,
	eliminarProducto,
	listaUsuarios,
};
