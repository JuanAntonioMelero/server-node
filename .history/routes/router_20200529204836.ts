import { Router, Request, Response} from 'express';
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/sockets';

var Usuario = require('../models/usuario');

const router = Router();

router.get('/mensajes', (req: Request, resp: Response)=>{
    resp.json({
        ok:true,
        mensaje:'Todo esta bien!!'}); 
})

router.post('/mensajes', (req: Request, resp: Response)=>{

    const cuerpo=req.body.cuerpo;
    const de=req.body.de;
    const server= Server.instance;
    const payload = {
        de,
        cuerpo
    }
 // enviar mensaje a todos los usuarios
 server.io.emit('mensaje-nuevo',payload);
   
    resp.json({
        ok:true,
        cuerpo,
        de,
        mensaje:'Mensaje post listo!!'}); 
})

// servicio para enviar un mensaje privado a un usuario por su id
router.post('/mensajes/:id', (req: Request, resp: Response)=>{

    const cuerpo=req.body.cuerpo;
    const de=req.body.de;
    const id= req.params.id;
    const payload= {
        de,
        cuerpo
    };
    const server= Server.instance;

    // enviar mensaje a un usuario en concreto
    server.io.in(id).emit('mensaje-privado',payload);

    resp.json({
        ok:true,
        cuerpo,
        de,
        id,
        mensaje:'Mensaje post listo!!'}); 
})
// servicio para obtener los id de los usuarios
router.get('/usuarios', (req: Request, resp: Response)=>{
    const server = Server.instance;
    server.io.clients((err:any,clientes: string[])=>{
        if (err){
            return resp.json({ 
                ok:false,
                error: err
            })
        }
        resp.json({
            ok:true,
            clientes}); 

    })
   
})
//obtener usuarios y sus nombres
router.get('/usuarios/detalle', (req: Request, resp: Response)=>{
   
        resp.json({
            ok:true,
            clientes:  usuariosConectados.getLista()}); 

    })

// ==========================================
// Crear un nuevo usuario
// ==========================================
router.post('/',(req, res) => {

    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        img: body.img,
        role: body.role
    });

    usuario.save((err: any, usuarioGuardado: any) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado
        });


    });

});

export default router;