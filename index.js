require('dotenv').config();

const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.APP_PORT

const clientsApi = require('./app/api/clientsApi')
const clientActionApi = require('./app/api/clientActionApi')
const user = require('./app/api/userApi')

const corsOptions = {
	origin: process.env.CORS_ORIGIN,
	optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/client', clientsApi);
app.use('/api/action', clientActionApi)
app.use('/api/user', user)

app.listen(port)