const { Router } = require("express");
const {
  usuariosGet,
  usuarioPost,
  usuariosPut,
  usuarioSDelete,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);
router.post("/", usuarioPost);
router.put("/:id", usuariosPut);
router.delete("/", usuarioSDelete);

module.exports = router;
