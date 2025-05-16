import express from "express";
import {getPlatos, setPlato, getPlatoByNombre, deletePlatoById, updatePlatoById, getPlatosByTipo, getPlatosByDificultad, getPlatosByTiempoCoccion} from "../controllers/platoController.js";

const router = express.Router();

router.get("/", getPlatos);
router.post("/", setPlato);
router.delete("/:id", deletePlatoById);
router.put("/:id", updatePlatoById);
router.get("/:nombre", getPlatoByNombre);
router.get("/tipo/:tipo", getPlatosByTipo);
router.get("/dificultad/:dificultad", getPlatosByDificultad);
router.get("/tiempo/:tiempo", getPlatosByTiempoCoccion);

export default router;