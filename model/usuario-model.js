const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
	name: {
		type: String,
		required: true,
	},

	edad: {
		type: Number,
	},

	email: {
		type: String,
		required: true,
		unique: true,
	},

	password: {
		type: String,
		required: true,
	},

	rol: {
		type: String,
		default: 'Usuario',
	},
});

module.exports = model('Usuarios', UsuarioSchema);
