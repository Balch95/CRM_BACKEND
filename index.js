const express = require('express')
const cors = require('cors')

const app = express()
const port = 5050

const clientsApi = require('./app/api/clientsApi')

const corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/client', clientsApi);


app.listen(port)