export class Usuario{
    public id: string;
    public displayName?: string;
    public email?: string;
    public role?:string;
    constructor(id:string){
        this.id =id;
        this.displayName ='sin-nombre';
        this.role= 'USER-ROLE';
    }
}