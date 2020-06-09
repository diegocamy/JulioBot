const wa = require('@open-wa/wa-automate');
const express = require('express');
require('dotenv').config();
const app = express();

const { ayuda, generos } = require('./mensajes/ayuda');
const horoscopo = require('./utils/horoscopo');
const buscarPelicula = require('./utils/peliculas');
const obtenerVersiculo = require('./utils/versiculo');
const { reirse } = require('./utils/reacciones');
const getVideo = require('./utils/porneta');
const mensajeHidratarse = require('./mensajes/tomarAgua');
let recordatorioHidratarse = false;
let idChat = '';

wa.create().then(client => start(client));

function start(client) {
  //Recordatorio para tomar agua a cada 30 minutos
  setInterval(async () => {
    if (recordatorioHidratarse) {
      await client.simulateTyping(idChat, true);
      setTimeout(async () => {
        await client.sendText(idChat, mensajeHidratarse());
        await client.simulateTyping(idChat, false);
      }, 3000);
    }
  }, 1800000);

  client.onMessage(async message => {
    try {
      //AYUDA
      if (message.body === '!ayuda') {
        await client.simulateTyping(message.from, true);
        setTimeout(async () => {
          await client.reply(message.from, ayuda, message);
          await client.simulateTyping(message.from, false);
        }, 3000);
      }

      //AYUDA GENEROS
      if (message.body === '!generos') {
        await client.simulateTyping(message.from, true);
        setTimeout(async () => {
          await client.reply(message.from, generos, message);
          await client.simulateTyping(message.from, false);
        }, 3000);
      }

      //HOROSCOPO
      if (
        message.body.startsWith('!horoscopo') &&
        message.body.split(' ')[1].length > 0
      ) {
        const signo = message.body.split(' ')[1];
        const resultadoHoroscopo = await horoscopo(signo);
        await client.simulateTyping(message.from, true);
        setTimeout(async () => {
          await client.reply(message.from, resultadoHoroscopo, message);
          await client.simulateTyping(message.from, false);
        }, 3000);
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
        await client.simulateTyping(message.from, true);
        setTimeout(async () => {
          await client.reply(message.from, resultadoPelicula, message);
          await client.simulateTyping(message.from, false);
        }, 3000);
      }
      //VERSICULO
      if (message.body === '!versiculo') {
        const versiculo = await obtenerVersiculo();
        await client.simulateTyping(message.from, true);
        setTimeout(async () => {
          await client.reply(message.from, versiculo, message);
          await client.simulateTyping(message.from, false);
        }, 3000);
      }

      //REIRSE
      if (
        message.body.toLowerCase().includes('jaja') ||
        message.body.toLowerCase().includes('juajua')
      ) {
        await client.simulateTyping(message.from, true);
        setTimeout(async () => {
          await client.sendText(message.from, reirse());
          await client.simulateTyping(message.from, false);
        }, 3000);
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
        await client.simulateTyping(message.from, true);
        setTimeout(async () => {
          await client.sendText(
            message.from,
            'Recordatorio activado! Para desactivarlo enviá: *!agua off*',
          );
          await client.sendText(message.from, mensajeHidratarse());
          await client.simulateTyping(message.from, false);
        }, 3000);
      }

      //DESACTIVAR RECORDATORIO PARA TOMAR AGUA
      if (message.body === '!agua off') {
        idChat = '';
        recordatorioHidratarse = false;
        await client.simulateTyping(message.from, true);
        setTimeout(async () => {
          await client.sendText(message.from, 'Recordatorio desactivado!');
          await client.simulateTyping(message.from, false);
        }, 3000);
      }

      //PORNETA
      if (message.body === '!porneta') {
        await client.simulateTyping(message.from, true);
        await client.reply(
          message.from,
          'Para que voy a buscar un video',
          message,
        );
        await client.simulateTyping(message.from, false);

        await client.simulateTyping(message.from, true);
        const video = await getVideo();
        await client.sendLinkWithAutoPreview(message.from, video, 'Nu meio');
        await client.simulateTyping(message.from, false);
      }
    } catch (error) {
      console.log(error);
    }
  });
}

app.get('/', (req, res) => {
  return res.sendFile(__dirname + '/julioQR.png');
});

const PORT = process.env.PORT || '5000';

app.listen(PORT, () => console.log('Server listening on port ' + PORT));
