var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var mensajeSchema = new Schema({

    de: { type: String, required: [true, 'El nombre es necesario'] },
    cuerpo: { type: String, required: [true, 'El cuerpo es necesario'] }
     }

);

mensajeSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Mensajes', mensajeSchema);