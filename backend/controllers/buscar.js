const { request, response } = require("express");

//importar ObjectId de mongoose Types
const { ObjectId } = require("mongoose").Types;

//Importar los modelos de categoría y productos
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");

//Definir colecciones permitidas
const coleccionesPermitidas = ["categorias", "productos"];

//Función para buscar por categoria------------------------

const buscarCategoria = async (termino, res = response) => {
  //Verificar si en vez del nombre manda el id
  const isMongoId = ObjectId.isValid(termino);
  if (isMongoId) {
    const categoria = await Categoria.findById(termino).populate(
      "usuario",
      "name"
    );
    return res.status(200).json({
      results: categoria ? [categoria] : [], //results:[]
    });
  }

  //Si la búsqueda se hace por el nombre
  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({
    nombre: regex,
    estado: true,
  }).populate("usuario", "name");

  res.json({
    results: categorias,
  });
};

//Función para buscar por producto--------------------------
const buscarProducto = async (termino, res = response) => {
  //Verificar si en vez del nombre manda el id
  const isMongoId = ObjectId.isValid(termino);
  if (isMongoId) {
    const producto = await Producto.findById(termino)
      .populate("usuario", "name")
      .populate("categoria", "nombre");
    return res.status(200).json({
      results: producto ? [producto] : [], //results:[]
    });
  }

  //Si la búsqueda se hace por el nombre
  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({
    nombre: regex,
    estado: true,
  })
    .populate("usuario", "name")
    .populate("categoria", "nombre");

  res.json({
    results: productos,
  });
};

//Crear la función de búsqueda flexible

const buscar = async (req = request, res = response) => {
  //Traer los parámetros de la colección y del término
  const { coleccion, termino } = req.params;

  //Verificar si la colección es válida
  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "categorias":
      buscarCategoria(termino, res);

      break;
    case "productos":
      buscarProducto(termino, res);
      break;
    default:
      res.status(500).json({
        msg: "No se generaron las búsquedas",
      });
      break;
  }
};

module.exports = {
  buscar,
};
