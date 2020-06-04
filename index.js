const sulla = require('sulla');
const fse = require('fs-extra');
require('dotenv').config();

const { ayuda, generos } = require('./mensajes/ayuda');
const horoscopo = require('./utils/horoscopo');
const buscarPelicula = require('./utils/peliculas');

fse
  .remove('./session/Default/Service Worker/Database/MANIFEST-000001')
  .then(() => {
    sulla.create().then(client => start(client));
  });

function start(client) {
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
  });
}
