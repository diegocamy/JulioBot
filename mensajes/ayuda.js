const ayuda = `Hola! Soy JulioBot 🤖.
Los comandos disponibles son: 

*!filme* _genero_ - para que te recomiende una película 🎬
Ejemplo: !filme crimen
Para conocer los géneros usá *!generos*

*!horoscopo* _tusigno_ - para recibir el horoscopo del día 🍀
Ejemplo: !horoscopo acuario

*!versiculo* - te doy una palabra de la biblia aunque seas pecador 👹

*!agua on* - activar el recordatorio para mantenerte hidratado durante el día

*!agua off* - desactivar el recordatorio para mantenerte hidratado`;

const generos = `Generos disponibles:
Acción 💥
Animación 👦
Aventura 🗺
Bélica 🔫
Ciencia Ficción 👽
Comedia 😂
Crimen 🔪
Documental 🤓
Drama 😥
Familia 👨‍👩‍👧‍👦
Fantasía 🎅
Historia 📚
Misterio 🕵️‍♂️
Música 🎷
Romance 💏
Suspense 😶
Terror 👹
Western 🤠`;

const nadaParaMostrar = `No hay resultados 👀
Para ver los comandos disponibles enviá: *!ayuda*`;

module.exports = {
  ayuda,
  generos,
  nadaParaMostrar,
};
