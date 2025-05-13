import {
  getDetallesServicio,
  createDetalleServicio,
  updateDetalleServicio,
  deleteDetalleServicio,
} from "../services/detalleServicioService.js";

export const getAllDetallesServicio = async (req, res) => {
  try {
    const detallesServicio = await getDetallesServicio();
    res.status(200).json(detallesServicio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addDetalleServicio = async (req, res) => {
  try {
    const newDetalleServicio = await createDetalleServicio(req.body);
    res.status(201).json(newDetalleServicio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDetalleServicioById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDetalleServicio = await updateDetalleServicio(id, req.body);
    res.status(200).json(updatedDetalleServicio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDetalleServicioById = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteDetalleServicio(id);
    res.status(200).json({ message: "Detalle de servicio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};