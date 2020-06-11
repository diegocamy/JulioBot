const Pornsearch = require('pornsearch');

const getVideo = async (query, client, message) => {
  try {
    await client.reply(
      message.from,
      'Voy a buscar un buen video, puede demorar unos segundos',
      message,
    );

    const Searcher = new Pornsearch(query);
    const respuesta = await Searcher.videos();
    const videos = Object.values(respuesta);
    const videoRandom = videos[Math.floor(Math.random() * videos.length)].url;

    return await client.sendLinkWithAutoPreview(
      message.from,
      videoRandom,
      'Pisa y pisa',
    );
  } catch (error) {
    return await client.sendText(
      message.from,
      'Intentá buscar porno sin utilizar palabras con tilde o simbolos raros',
    );
  }
};

module.exports = getVideo;
