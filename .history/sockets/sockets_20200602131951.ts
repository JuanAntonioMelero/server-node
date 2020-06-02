import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from "../classes/usuario";
import router from "../routes/router";

export const usuariosConectados = new UsuariosLista();
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
       
        
        console.log('Mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload);
});
}
//Escuchar usuarios
export const usuario = ( cliente:Socket, io: socketIO.Server )=>{
    
    cliente.on('usuario',(payload:{ displayName:string, email:string, role:string })=>{
        
        console.log('Usuario recibido', payload);

        io.emit('usuario-nuevo', payload);
});
}
//Escuchar atencion
export const atencion = ( cliente:Socket, io: socketIO.Server )=>{
    
    cliente.on('atencion',(payload:{ atendido:string, id:string, turno:Number })=>{
        
        console.log('atencion recibido', payload);

        io.emit('atencion-nuevo', payload);
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