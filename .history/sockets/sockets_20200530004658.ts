import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from "../classes/usuario";
import { Router } from "express";
var Mensaje = require('../models/mensajes');

export const usuariosConectados = new UsuariosLista();
const router = Router();
export const conectarcliente = (cliente:Socket)=>{
    const usuario = new Usuario( cliente.id);
    usuariosConectados.agregar(usuario);
    
}
export const desconectar = ( cliente:Socket, io:socketIO.Server )=>{
    
        cliente.on('disconnect',()=>{
            usuariosConectados.borrarUsuario(cliente.id);
            io.emit('usuarios-activos',usuariosConectados.getLista());
            console.log('cliente Desconectado');
       
    });
}

//Escuchar mensajes
export const mensaje = ( cliente:Socket, io: socketIO.Server )=>{
    
    cliente.on('mensaje',(payload:{ de:string, cuerpo:string })=>{
        
        router.post('/mensajes', (resp)=>{
    
           
        
            var mensaje = new Mensaje({
                payload
            });
        
            mensaje.save((err: any, mensajeGuardado: any) => {
        
                if (err) {
                    return ({
                        ok: false,
                        mensaje: 'Error al crear usuario',
                        errors: err
                    });
                }
        
                resp ({
                    ok: true,
                    mensaje: mensajeGuardado,
                });
        
        
            });
        
        
        
        })
        
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
});
}

//Obtener Nombre Usuario
export const configurarUsuario = (cliente:Socket, io:socketIO.Server)=>{
    cliente.on('configurar-usuario',(payload:{nombre:string},callback: Function)=>{
        usuariosConectados.actualizarNombre(cliente.id,payload.nombre);
        io.emit('usuarios-activos',usuariosConectados.getLista());
        callback({
            ok:true,
            mensaje:`Usuario ${payload.nombre} registrado`
        })
    } );
}

//Obtener Usuarios
export const obtenerUsuarios = (cliente:Socket, io:socketIO.Server)=>{
    cliente.on('obtenerUsuarios',()=>{
        io.to(cliente.id).emit('usuarios-activos',usuariosConectados.getLista());
    });
}