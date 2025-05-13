import {
  getRecepciones,
  createRecepcion,
  updateRecepcion,
  deleteRecepcion,
} from "../services/recepcionService.js";

export const getAllRecepciones = async (req, res) => {
  try {
    const recepciones = await getRecepciones();
    res.status(200).json(recepciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addRecepcion = async (req, res) => {
  try {
    const newRecepcion = await createRecepcion(req.body);
    res.status(201).json(newRecepcion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRecepcionById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRecepcion = await updateRecepcion(id, req.body);
    res.status(200).json(updatedRecepcion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRecepcionById = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteRecepcion(id);
    res.status(200).json({ message: "Recepción eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};