import express from "express";
import {
  getAllRecepciones,
  addRecepcion,
  updateRecepcionById,
  deleteRecepcionById,
} from "../controllers/recepcionController.js";

const router = express.Router();

router.get("/", getAllRecepciones);
router.post("/", addRecepcion);
router.put("/:id", updateRecepcionById);
router.delete("/:id", deleteRecepcionById);

export default router;