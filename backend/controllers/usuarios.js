const { request, response } = require("express");

//Funciones

const usuariosGet = (req = request, res = response) => {
  const { limit, page } = req.query;
  //request, response
  res.json({ message: "GET usuarrios - Controllers", limit, page });
};

const usuarioPost = (req = request, res = response) => {
  const { nombre, correo } = req.body;
  res.json({ message: "POST usuarrios - Controllers", nombre, correo });
};

const usuariosPut = (req = request, res = response) => {
  const { id } = req.params;

  res.json({ message: "PUT usuarrios - Controllers", id });
};

const usuarioSDelete = (req, res) => {
  //request, response
  res.json({ message: "DELETE usuarrios - Controllers" });
};

module.exports = { usuariosGet, usuarioPost, usuariosPut, usuarioSDelete };
