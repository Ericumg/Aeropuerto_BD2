import express from "express";
import {
  getAllAsignaciones,
  addAsignacion,
  updateAsignacionById,
  deleteAsignacionById,
} from "../controllers/asignacionEmpleadoController.js";

const router = express.Router();

router.get("/", getAllAsignaciones);
router.post("/", addAsignacion);
router.put("/:id", updateAsignacionById);
router.delete("/:id", deleteAsignacionById);

export default router;