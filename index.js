//forma de importar en Node
const express = require('express');
const dbConnection = require('./database/config');
const app = express();
const cors = require('cors');
require('dotenv').config();

//lecutra y parseo del body
app.use(express.json());

//cors
app.use(cors());

app.use('/auth', require('./router/authRouter'));
app.use('/admin', require('./router/adminRouter'));

dbConnection();

app.listen(process.env.PORTLOCAL, () => {
	console.log(`Ejecutandose en el puerto ${process.env.PORTLOCAL}`);
});
