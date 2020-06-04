const mensajes = [
  'Hora de tomar un vaso de agua!',
  'Todo muy lindo pero tomate un vasito de agua',
  '👉💧',
  'HORA DEL VASO DE AGUA! ⌛',
  'Tomate un vaso de agua',
  'Utilizo este medio para recordar que debido a que está activado el recordatorio de hidratación es necesario que se ingiera un vaso de agua para continuar.',
  '💧H2O',
  'Uhhh! Mirá el reloj! Son las agua en punto. 🚰',
  'Ta lindo para tomar ~una cerveza~ un vaso de agua. Y después una cerveza bien fría 🍺',
  'No te olvides de hidratarte.',
  'Agua, agua, aguaaaa, AGUAAAAAAA',
  'Si, bueno... Quién quiere agua?',
];

const obtenerMensaje = () => {
  return mensajes[Math.floor(Math.random() * mensajes.length)];
};

module.exports = obtenerMensaje;
