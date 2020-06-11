const risas = ['jajajaja', 'juajuajauja', 'jajajaja que hdp'];

const reirse = () => {
  return risas[Math.floor(Math.random() * risas.length)];
};

module.exports = {
  reirse,
};
