import { Usuario } from './usuario';

export class UsuariosLista {
    private lista: Usuario[] = [];
    
    constructor(){}
    // agregar un usuario
    public agregar (usuario: Usuario){
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }
    // actualizar nombre de usuario
    public actualizarNombre(id: string, name: string){
        for(let usuario of this.lista){
            if (usuario.id === id){
                usuario.displayName = name;
                break;
            }
        }
        console.log('===Actualizando Usuario===');
        console.log(this.lista);
    }
    // Obtener lista
    public getLista(){
        return this.lista.filter(usuario=>usuario.displayName !== 'sin-nombre');
    }
    // obtener un usuario
    public getUsuario(id:string){
        return this.lista.find(usuario=>{ usuario.id === id })
    }

   /*  //obtener usuarios en una sala
    public getUsuarioSala(sala:string){
        return this.lista.filter(usuario=>{ usuario.sala === sala })
    } */
    //borrar un usuario
    public borrarUsuario(id:string){
        const tempUser= this.getUsuario(id);
        this.lista=this.lista.filter(usuario =>{ return usuario.id !== id});
        console.log(this.lista);
        return tempUser;
    }
}