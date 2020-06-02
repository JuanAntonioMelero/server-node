export class Atencion {
    constructor(
      public atendido: string,
      public id: string,
      public fechaSolicitud?: number,
      public idCaja?: string,
      public idUsuario?: string,
      public turno?: number,
      public fechaAtendido?: number
    ) {}
  }