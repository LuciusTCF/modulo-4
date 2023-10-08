const { request, response } = require("express");
const Usuario = require("../models/usuario");

//Funciones

const usuariosGet = (req = request, res = response) => {
  const { limit, page } = req.query;
  //request, response
  res.json({ message: "GET usuarrios - Controllers", limit, page });
};

const usuarioPost = async (req = request, res = response) => {
  const { name, email, password } = req.body;

  const usuario = new Usuario({ name, email, password });

  await usuario.save();

  res.status(201).json({ message: "Usuario creado", usuario });
};

const usuarioPut = (req = request, res = response) => {
  const { id } = req.params;

  res.json({ message: "PUT usuarrios - Controllers", id });
};

const usuarioDelete = (req, res) => {
  //request, response
  res.json({ message: "DELETE usuarrios - Controllers" });
};

module.exports = { usuariosGet, usuarioPost, usuarioPut, usuarioDelete };
