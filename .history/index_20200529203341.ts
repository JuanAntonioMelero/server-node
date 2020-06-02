import Server from './classes/server';
import { SERVER_PORT } from './globals/enviroment';
import router from './routes/router';
import bodyParser from 'body-parser';
var mongoose = require('mongoose');

import cors from 'cors';

const server = Server.instance;

//bodyparser siempre antes de las rutas

server.app.use(bodyParser.urlencoded({ extended: true}));
server.app.use(bodyParser.json());

//cors
server.app.use(cors({origin:true, credentials:true }));

//Rutas de servicios

server.app.use('/', router)

server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`);
}); 