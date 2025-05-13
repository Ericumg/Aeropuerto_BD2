import { getCheckIns, createCheckIn, updateCheckIn, deleteCheckIn } from "../services/checkInService.js";

export const getAllCheckIns = async (req, res) => {
  try {
    const checkIns = await getCheckIns();
    res.status(200).json(checkIns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addCheckIn = async (req, res) => {
  try {
    const newCheckIn = await createCheckIn(req.body);
    res.status(201).json(newCheckIn);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCheckInById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCheckIn = await updateCheckIn(id, req.body);
    res.status(200).json(updatedCheckIn);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCheckInById = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCheckIn(id);
    res.status(200).json({ message: "Check-in eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};