import express from "express";
import {getPlatos, setPlato, getPlatoByNombre, deletePlatoById, updatePlatoById, getPlatosByTipo, getPlatosByDificultad, getPlatosByTiempoCoccion, getPlatoById} from "../controllers/platoController.js";

const router = express.Router();

router.get("/tipo/:tipo", getPlatosByTipo);
router.get("/dificultad/:dificultad", getPlatosByDificultad);
router.get("/tiempo/:tiempo", getPlatosByTiempoCoccion);
router.get("/nombre/:nombre", getPlatoByNombre);
router.get("/:id", getPlatoById);
router.get("/", getPlatos);
router.post("/", setPlato);
router.delete("/:id", deletePlatoById);
router.put("/:id", updatePlatoById);

export default router;