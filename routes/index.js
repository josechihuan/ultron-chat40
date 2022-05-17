var express = require('express');
var router = express.Router();
const Mensaje = require('../models/mensaje.model');

/* GET home page. */
//vamos recuperar y mostrar los mensajes almacenados y requerimos el modelo Mansaje
router.get('/', async function(req, res, next) {
 //res.render('index', { title: 'Express' });
  // limitamos los datos a recuperar ordenados por fecha de creacion por ejemplo con sort,createdAt es el parametro que se crea en la base de datos, con el limit, los 5 ultimos mensajes.y luego lo ejecuta
  //el Mensaje.find() devuelve una promesa 
    const mensajes =  await Mensaje.find().sort({ createdAd: -1 }).limit(5).exec();
  //console.log(mensajes);
  // ya tenemos ahora un array mensajes para poder mostrarlos en una lista
  //para que muestre el ultimo mensaje y no lo mande arriba
  res.render('index', {mensajes: mensajes.reverse()});
});

module.exports = router;
