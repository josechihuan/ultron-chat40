const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mensajeSchema = new Schema({

  nombre: String,
  texto: String,
  //fechaCreacion: {type: String, default: new Date}
}, {timestamps:true});
// en vez de true podemos darle nombre a los campos createdAt= 'fecha de creacion', updatedAt='fecha de actualilzacion entre llaves'
module.exports = mongoose.model('mensaje', mensajeSchema);