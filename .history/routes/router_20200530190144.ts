import { Router, Request, Response} from 'express';
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/sockets';
var Usuario = require('../models/usuario');
var Mensaje = require('../models/mensajes');

const router = Router();

router.get('/mensajes', (req: Request, resp: Response)=>{
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Mensaje.find({}, 'cuerpo de')
    .skip(desde)
    .limit(5)
    .exec(
        (err:any, mensajes:any) => {

            if (err) {
                return resp.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando mensajes',
                    errors: err
                });
            }

            Mensaje.count({}, (err:any, conteo:any) => {

                resp.status(200).json({
                    ok: true,
                    mensajes: mensajes,
                    total: conteo
                });

            })




        });
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


// añadir mensajes
router.post('/mensajes', (req: Request, resp: Response)=>{
    
    var body = req.body;

        var mensaje = new Mensaje({
            cuerpo: body.cuerpo,
            de: body.de
        });

    mensaje.save((err: any, mensajeGuardado: any) => {

        if (err) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'Error al guardar el mensaje',
                errors: err
            });
        }

        resp.status(201).json({
            ok: true,
            mensaje: mensajeGuardado,
        });


    });



})
//obtener lista mensajes


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
})//obtener usuarios y sus nombres
router.get('/usuarios/detalle', (req: Request, resp: Response)=>{
   
        resp.json({
            ok:true,
            clientes:  usuariosConectados.getLista()}); 

    })

// ==========================================
// Crear un nuevo usuario MongoDB
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
            usuario: usuarioGuardado,
            
        });


    });

});

export default router;