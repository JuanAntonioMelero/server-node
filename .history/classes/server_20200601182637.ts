import express from 'express';
import { SERVER_PORT } from '../globals/enviroment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server {

    private static _instance: Server;
    public app: express.Application ;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor (){
         this.app= express();
         this.port=SERVER_PORT;
         this.httpServer = new http.Server(this.app);
         this.io=socketIO(this.httpServer);
         this.escucharSockets();

     }
    public static get instance(){
        return this._instance ||(this._instance = new this());
     }
    private escucharSockets(){
            console.log('escuchando conexiones - sockets');
            this.io.on('connection',cliente=>{
                //conectar cliente
                socket.conectarcliente(cliente);

                //recibir configurar-usuario
                socket.configurarUsuario(cliente, this.io);
                // escuchar obtenerUsuarios
                socket.obtenerUsuarios(cliente,this.io);
                console.log('cliente conectado');
                //desconectar
                socket.desconectar( cliente, this.io);
                //recibir mensajes
                socket.mensaje(cliente, this.io);
                 //recibir usuarios
                 socket.usuario(cliente, this.io);
               
            })
     }
    start( callback: Function ){
         this.httpServer.listen(this.port, callback() );
     }
} 