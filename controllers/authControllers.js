const usuarioModel = require('../model/usuario-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const crearUsuario = async (req, res) => {
	try {
		//atravez de req.body recibimos en un objeto lo que nos envio el "FRONT"
		const { name, edad, email, password } = req.body;

		//validaciones
		if (name === '' || edad === '' || email === '' || password === '') {
			res.status(400).json({
				msg: 'Todos los campos son obligatorios',
			});
		}

		//analizamos si el correo ingresado no esta registrado
		let usuario = await usuarioModel.findOne({ email });
		if (usuario) {
			return res.status(400).json({
				mensaje: 'El usuario ya existe',
			});
		}

		//en el caso que no exista el correo en la base de datos, creamos una instancia
		usuario = new usuarioModel(req.body);

		//encriptamos password
		const salt = bcrypt.genSaltSync(10);
		usuario.password = bcrypt.hashSync(password, salt);

		// //guardarlo en la base de datos
		await usuario.save();

		res.status(201).json({
			msg: 'Usuario creado',
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Por favor contactarse con un administrador',
		});
	}
};

const loginUsuario = async (req, res) => {
	try {
		const { email, password } = req.body;

		//validaciones basicas
		if (email === '' || password === '') {
			res.status(400).json({
				msg: 'Todos los campos son obligatorios',
			});
		}

		//analizamos si el correo ingresado no esta registrado
		let usuario = await usuarioModel.findOne({ email });
		if (!usuario) {
			return res.status(400).json({
				mensaje: 'El email no existe',
			});
		}

		//validar password, vamos a comparar la contraseña del correo que encontre con la que ingreso el USUARIO
		const validarPassword = bcrypt.compareSync(password, usuario.password);
		if (!validarPassword) {
			res.status(400).json({
				msg: 'La contraseña es incorrecta',
			});
		}

		//creamos un objeto el cual definimos los datos que queremos guardar en el token, Recordar no guardar informacion sensible
		const payload = {
			name: usuario.name,
			rol: usuario.rol,
		};

		const token = jwt.sign(payload, process.env.SECRET_JWT, {
			expiresIn: '3h',
		});

		res.status(200).json({
			msg: 'Usuario logueado',
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Por favor contactarse con un administrador',
		});
	}
};

module.exports = { crearUsuario, loginUsuario };
