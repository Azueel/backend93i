//forma de importar en Node
const express = require('express');
const dbConnection = require('./database/config');
const app = express();
require('dotenv').config();

//lecutra y parseo del body
app.use(express.json());

app.use('/auth', require('./router/authRouter'));

dbConnection();

app.listen(process.env.PORTLOCAL, () => {
	console.log(`Ejecutandose en el puerto ${process.env.PORTLOCAL}`);
});
