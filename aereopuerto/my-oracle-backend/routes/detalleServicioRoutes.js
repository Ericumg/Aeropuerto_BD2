import express from "express";
import {
  getAllDetallesServicio,
  addDetalleServicio,
  updateDetalleServicioById,
  deleteDetalleServicioById,
} from "../controllers/detalleServicioController.js";

const router = express.Router();

router.get("/", getAllDetallesServicio);
router.post("/", addDetalleServicio);
router.put("/:id", updateDetalleServicioById);
router.delete("/:id", deleteDetalleServicioById);

export default router;