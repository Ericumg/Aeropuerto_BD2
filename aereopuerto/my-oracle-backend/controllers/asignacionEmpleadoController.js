import {
  getAsignaciones,
  createAsignacion,
  updateAsignacion,
  deleteAsignacion,
} from "../services/asignacionEmpleadoService.js";

export const getAllAsignaciones = async (req, res) => {
  try {
    const asignaciones = await getAsignaciones();
    res.status(200).json(asignaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addAsignacion = async (req, res) => {
  try {
    const newAsignacion = await createAsignacion(req.body);
    res.status(201).json(newAsignacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAsignacionById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAsignacion = await updateAsignacion(id, req.body);
    res.status(200).json(updatedAsignacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAsignacionById = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteAsignacion(id);
    res.status(200).json({ message: "Asignación eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};