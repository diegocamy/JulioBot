const axios = require('axios');
const { parse } = require('node-html-parser');

const { nadaParaMostrar } = require('../mensajes/ayuda');

const signos = [
  'aries',
  'tauro',
  'geminis',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'escorpio',
  'sagitario',
  'capricornio',
  'acuario',
  'piscis',
];

const horoscopo = async signo => {
  try {
    if (Math.ceil(Math.random() * 20) === 20) {
      return `🐂`;
    }

    signo = signo.toLowerCase();
    const { data: pagina } = await axios.get(
      'https://www.lanacion.com.ar/horoscopo',
    );
    const html = await parse(pagina);
    const objetoHoroscopo = {};

    await html //selecciona los parrafos con la suerte del dia para cada signo
      .querySelectorAll('.listaSignos__item__descrip p')
      .forEach((signo, index) => {
        objetoHoroscopo[signos[index]] = signo.text; //los agrega al objeto horoscopo
      });

    const respuesta = objetoHoroscopo[signo.toLowerCase()];

    if (!respuesta) {
      return nadaParaMostrar;
    }

    return `*Horoscopo para ${signo}:*

    ${respuesta}`;
  } catch (error) {
    return `Ha ocurrido un error a la hora de ver tu horoscopo 😥`;
  }
};

module.exports = horoscopo;
