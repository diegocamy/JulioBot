const sulla = require('sulla');
const fse = require('fs-extra');
require('dotenv').config();

const { ayuda, generos } = require('./mensajes/ayuda');
const horoscopo = require('./utils/horoscopo');
const buscarPelicula = require('./utils/peliculas');
const obtenerVersiculo = require('./utils/versiculo');
const { reirse } = require('./utils/reacciones');
const mensajeHidratarse = require('./mensajes/tomarAgua');

let recordatorioHidratarse = false;
let idChat = '';

fse
  .remove('./session/Default/Service Worker/Database/MANIFEST-000001')
  .then(() => {
    sulla.create().then(client => start(client));
  });

function start(client) {
  //Recordatorio para tomar agua a cada 30 minutos
  setInterval(async () => {
    if (recordatorioHidratarse) {
      await client.sendText(idChat, mensajeHidratarse());
    }
  }, 1800000);

  client.onMessage(async message => {
    //AYUDA
    if (message.body === '!ayuda') {
      await client.sendText(message.from, ayuda);
    }

    //AYUDA GENEROS
    if (message.body === '!generos') {
      await client.sendText(message.from, generos);
    }

    //HOROSCOPO
    if (
      message.body.startsWith('!horoscopo') &&
      message.body.split(' ')[1].length > 0
    ) {
      const signo = message.body.split(' ')[1];
      const resultadoHoroscopo = await horoscopo(signo);

      await client.sendText(message.from, resultadoHoroscopo);
    }

    //PELICULAS
    if (
      message.body.startsWith('!filme') &&
      message.body.split(' ')[1].length > 0
    ) {
      const arrayGeneroIngresado = message.body.split(' ');
      let resultadoPelicula;
      if (arrayGeneroIngresado.length > 2) {
        resultadoPelicula = await buscarPelicula(
          arrayGeneroIngresado[1] + arrayGeneroIngresado[2],
        );
      } else {
        resultadoPelicula = await buscarPelicula(arrayGeneroIngresado[1]);
      }

      await client.sendText(message.from, resultadoPelicula);
    }
    //VERSICULO
    if (message.body === '!versiculo') {
      const versiculo = await obtenerVersiculo();
      await client.sendText(message.from, versiculo);
    }

    //REIRSE
    if (
      message.body.toLowerCase().includes('jaja') ||
      message.body.toLowerCase().includes('juajua')
    ) {
      await client.sendText(message.from, reirse());
    }

    //ACTIVAR RECORDATORIO PARA TOMAR AGUA
    if (message.body === '!agua on') {
      if (recordatorioHidratarse) {
        return await client.sendText(
          message.from,
          'El recordatorio ya se encuentra activado',
        );
      }

      idChat = message.from;
      recordatorioHidratarse = true;

      await client.sendText(
        message.from,
        'Recordatorio activado! Para desactivarlo enviá: *!agua off*',
      );
      setTimeout(() => {}, 1500);
      await client.sendText(message.from, mensajeHidratarse());
    }

    //DESACTIVAR RECORDATORIO PARA TOMAR AGUA
    if (message.body === '!agua off') {
      idChat = '';
      recordatorioHidratarse = false;
      await client.sendText(message.from, 'Recordatorio desactivado!');
    }
  });
}
