export class Usuario{
    public id:string;
    public displayName: string;
    public email: string;
    public password: string;
    public role?:string;

    constructor(id:string){
        this.id =id;
        this.displayName ='sin-nombre';
        this.email = 'sin-email';
        this.password = 'sin-password';
    }
}