import express from "express";
import {getIngredientes, setIngrediente, getIngredienteById, updateIngredienteById, getIngredientesByTipo} from "../controllers/ingredienteController.js";

const router = express.Router();

router.get("/", getIngredientes);
router.get("/:id", getIngredienteById);
router.post("/", setIngrediente);
router.put("/:id", updateIngredienteById);
router.get("/tipo/:tipo", getIngredientesByTipo);

export default router;