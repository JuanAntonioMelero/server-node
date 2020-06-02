var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var atencionSchema = new Schema({

    atendido: { type: String, required: [true, 'Es necesario'] },
    id: { type: String, unique: true, required: [true, 'id es necesario'] },
    fechaSolicitud: { type: String, required: false },
    idCaja: { type: String, required: false },
    idUsuario: { type: String, required: false },
    turno: { type: Number, required: true },
    fechaAtendido: { type: String, required: false },
});

atencionSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Atencion', atencionSchema);