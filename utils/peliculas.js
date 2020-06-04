const axios = require('axios');
const { nadaParaMostrar } = require('../mensajes/ayuda');

const generos = {
  acción: 28,
  animación: 16,
  aventura: 12,
  bélica: 10752,
  cienciaFicción: 878,
  comedia: 35,
  crimen: 80,
  documental: 99,
  drama: 18,
  familia: 10751,
  fantasía: 14,
  historia: 36,
  misterio: 9648,
  música: 10402,
  películaDeTV: 10770,
  romance: 10749,
  suspense: 53,
  terror: 27,
  western: 37,
};

const obtenerPeliculaAleatoria = peliculas => {
  const indiceAleatorio = Math.floor(Math.random() * peliculas.length);
  return peliculas[indiceAleatorio];
};

const buscarPelicula = async genero => {
  try {
    const palabras = genero.split(' ');

    let generoPelicula;

    if (palabras.length === 1) {
      generoPelicula = palabras[0].toLowerCase();
    } else {
      palabras[0].toLowerCase() +
        palabras[1][0].toUpperCase() +
        palabras[1].substring(1, palabras[1].length);
    }

    const generoElegido = generos[generoPelicula];

    if (!generoElegido) {
      return nadaParaMostrar;
    }

    const numeroDePagina = Math.ceil(Math.random() * 5);

    const baseURL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIEDB_API_KEY}&language=es-ES&sort_by=popularity.desc&include_adult=true&include_video=true&page=${numeroDePagina}&with_genres=${generoElegido}`;

    const { data } = await axios.get(baseURL);
    const arrayPeliculas = await data.results;

    const peliculaAleatoria = obtenerPeliculaAleatoria(arrayPeliculas);

    const objetoPelicula = {
      nombre: peliculaAleatoria.title,
      resumen: peliculaAleatoria.overview,
      trailers: `https://www.youtube.com/results?search_query=trailer+${peliculaAleatoria.title
        .split(' ')
        .join('+')}`,
    };

    return `*Titulo:* ${objetoPelicula.nombre}
    *Resumen:* ${objetoPelicula.resumen}
    👇👇Trailer👇👇
    ${objetoPelicula.trailers}`;
  } catch (error) {
    return `Ha ocurrido un error a la hora de buscarte una película 😥`;
  }
};

module.exports = buscarPelicula;
