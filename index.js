const sulla = require('sulla');
const fse = require('fs-extra');

const { ayuda } = require('./mensajes/ayuda');
const horoscopo = require('./utils/horoscopo');

fse
  .remove('./session/Default/Service Worker/Database/MANIFEST-000001')
  .then(() => {
    sulla.create().then(client => start(client));
  });

function start(client) {
  client.onMessage(async message => {
    if (message.body === '!ayuda') {
      client.sendText(message.from, ayuda);
    }

    if (
      message.body.startsWith('!horoscopo') &&
      message.body.split(' ')[1].length > 0
    ) {
      const signo = message.body.split(' ')[1];
      const resultadoHoroscopo = await horoscopo(signo);

      await client.sendText(message.from, resultadoHoroscopo);
    }
  });
}
