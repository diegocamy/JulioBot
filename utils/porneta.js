const xvideos = require('@rodrigogs/xvideos');

const getVideo = async () => {
  const respuesta = await xvideos.videos.best({ page: 1 });
  const { videos } = respuesta;
  const video = videos[Math.floor(Math.random() * videos.length)].url;
  return video;
};

module.exports = getVideo;
