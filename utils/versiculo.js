const axios = require('axios');
const { parse } = require('node-html-parser');

// REINA VALERA 592420522e16049f-01

const obtenerVersiculo = async () => {
  try {
    const { data: pagina } = await axios.get(
      `https://dailyverses.net/get/random?language=rvr95&isdirect=1&position=${Math.ceil(
        Math.random() * 1300,
      )}`,
    );
    const html = await parse(pagina);
    const versiculo = [];
    await html
      .querySelectorAll('.dailyVerses')
      .forEach(div => versiculo.push(div.text));

    return `${versiculo[0]}
     
     *${versiculo[1]}*`;
  } catch (error) {
    return `Ha ocurrido un error a la hora de recibir el versículo 😣`;
  }
};

module.exports = obtenerVersiculo;
