import express from "express";
import {
  getAllCargasVuelo,
  addCargaVuelo,
  updateCargaVueloById,
  deleteCargaVueloById,
} from "../controllers/cargaVueloController.js";

const router = express.Router();

router.get("/", getAllCargasVuelo);
router.post("/", addCargaVuelo);
router.put("/:id", updateCargaVueloById);
router.delete("/:id", deleteCargaVueloById);

export default router;