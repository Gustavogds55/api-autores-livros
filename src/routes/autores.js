const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/autoresController");

router.get("/", ctrl.listar);
router.get("/:id", ctrl.buscarPorId);
router.post("/", ctrl.criar);
router.put("/:id", ctrl.atualizar);
router.delete("/:id", ctrl.remover);
router.get("/:id/livros", ctrl.listarLivros);

module.exports = router;
