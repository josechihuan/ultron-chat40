#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('../app');
const debug = require('debug')('appchat:server');
const http = require('http');




require('dotenv').config();

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
//importante porque aqui vamos a capturar eventos, aqui generamos la estyructura donde vamos a trabajo
const server = http.createServer(app);

//socket.io, el requare trae una funcion que podemos ejecutarla con los parentesis()
const io = require('socket.io')(server);
// funciona a travez de eventos, los eventos son cosas que suceden en diferentes puntos en la aplicaciom, podemos enterarnos de esos eventos y podemos aplicarlo con io, eventos relacionados con la propia libreria, el socket es el canal de comunicacion del callback
//socket es quien porta los datos, el mensaje, data, objeto etc etc
io.on('connection', (socket) => {
  console.log('Se ha conectado un nuevo cliente');
//  console.log(socket);  podemos captural el id del csocket
// aqui vamos a poder capturar todos los eventos que pasen en nuestra pagina.... data es el objeto que se manda desde el cliente, esto lo vemos en la terminal del back porque es parte del back, recibir cualquier tipo de evento que llegue a nuestro servidor, como podemos verlo en el terminal del servidor. el evento es mensaje_chat, y lo captura el servidor el evento y el data
  
  //
  socket.broadcast.emit('mensaje_chat', {
    nombre: 'INFO',
    mensaje: 'Se ha conectado un nuevo usuario'
  })

//io.engine,clientsCount  da la informacion de cuantos clientes conectados hay conectados, si podemos capturar ese valor y ponerlo al html del navegador para que aparezca el nro de usuarios conectatdos
  // como quiero que todos se entereen de la actualizacion de nro de usuarios, menos al que se conecta 
  io.emit('usuarios_chat', io.engine.clientsCount);
  // con esto solo lo emitimos ahora nos vamos al cliente y lo recepcioanmos y mostramos



  socket.on('mensaje_chat', (data) => {
    // console.log(data); comprobamos que vemos el mensaje emitido ahora vamos a mostrar a todos los clientes este evento
    io.emit('mensaje_chat', data); 
    
  });
  //aqui nos queremos enterar de cuando nos desconectamos 
  socket.on('disconnect', () => {
    io.emit('mensaje_chat', {
      nombre: 'INFO',
      mensaje: 'Se ha desconectado un usuario'
    });
    io.emit('usuarios_chat', io.engine.clientsCount);
  });
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
