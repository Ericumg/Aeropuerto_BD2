import express from "express";
import {
  getAllCheckIns,
  addCheckIn,
  updateCheckInById,
  deleteCheckInById,
} from "../controllers/checkInController.js";

const router = express.Router();

router.get("/", getAllCheckIns);
router.post("/", addCheckIn);
router.put("/:id", updateCheckInById);
router.delete("/:id", deleteCheckInById);

export default router;