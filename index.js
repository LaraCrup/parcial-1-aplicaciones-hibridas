import express from 'express';
import dotenv from 'dotenv';
import routerAPI from './routers/index.js';
import mongoose from 'mongoose';

dotenv.config()
const port = process.env.PORT;
const uri_db = process.env.URI_DB;

const app = express();

// Conectamos a la base de datos
mongoose.connect(uri_db);
const db = mongoose.connection;
db.on('error', (error) => console.error(error, 'Error de conexión'));
db.once('open', () => console.info('Conectado a la base de datos'));

// Middleware. Soporte para json.
app.use(express.json());

//Directorio de acceso publico de archivos estaticos
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Iniciando el servidor en el puerto ${port}`);
});

app.get('/', (req, res) => {
  console.log(`Cliente conectado`);
  res.send('<h1>Home</h1>');
});

//Llamamosa routerAPI
routerAPI(app);