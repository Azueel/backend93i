//forma de importar en Node
const express = require('express');
const app = express();

app.get('/saludo', (req, res) => {
	res.send('Hola Saludos desde el backend');
});

app.post('/crearUsuario', (req, res) => {
	res.send('usuario creado');
});

app.delete('/borrarUsuario', (req, res) => {
	res.send('Usuario eliminado');
});

app.put('/editar', (req, res) => {
	res.send('Usuario editado');
});

app.listen(4000, () => {
	console.log('Ejecutandose en el puerto 4000');
});
