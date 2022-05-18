var express = require('express');
var router = express.Router();
const Mensaje = require('../models/mensaje.model');

/* GET home page. */
//vamos recuperar y mostrar los mensajes almacenados y requerimos el modelo Mansaje
//PARA EL CHAT AGRAGAMOS ESTA RUTA

router.get('/', (req, res) => {
   res.render('index') //hemos cambiado el index,pug anterior por chat,pug y creamos un nuevo indes.pug para el formulario
});

//PARA EL CHAT AGRAGAMOS ESTA RUTA
router.get('/chat', async function (req, res) {
  
  console.log(req.session.nombre);
 //res.render('index', { title: 'Express' });
  // limitamos los datos a recuperar ordenados por fecha de creacion por ejemplo con sort,createdAt es el parametro que se crea en la base de datos, con el limit, los 5 ultimos mensajes.y luego lo ejecuta
  //el Mensaje.find() devuelve una promesa 
    const mensajes =  await Mensaje.find().sort({ createdAd: -1 }).limit(5).exec();
  //console.log(mensajes);
  // ya tenemos ahora un array mensajes para poder mostrarlos en una lista
  //para que muestre el ultimo mensaje y no lo mande arriba
  //res.render('index', { mensajes: mensajes.reverse() });// agregamos el nombre capturado de sesion como 3er parametro
  res.render('chat', { mensajes: mensajes.reverse(), nombre: req.session.nombre});
});

//VAMOS comprobar los datos con los que vamos a trabajar para ello  con res.json(req.body) recuperamos los datos asociados al formulario
router.post('/login', (req, res) => {
  //res.json(req.body) vemos que aqui en req.body hay una propiedad nombre y esa la guardamos
  //a req.session podemos engancharle cualquier propiedad y agregamos la propiedad nombre
  req.session.nombre = req.body.nombre;
  //ahora redirigimos al chat
  res.redirect('/chat');

});

module.exports = router;
