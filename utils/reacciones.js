const risas = [
  'jajajaja',
  'juajuajauja',
  'jajajaja que hdp',
  'jaaa',
  'pa re gracioso jaja',
  'jeje',
];

const reirse = () => {
  return risas[Math.floor(Math.random() * risas.length)];
};

module.exports = {
  reirse,
};
