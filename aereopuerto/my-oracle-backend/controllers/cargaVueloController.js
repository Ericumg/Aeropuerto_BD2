import {
  getCargasVuelo,
  createCargaVuelo,
  updateCargaVuelo,
  deleteCargaVuelo,
} from "../services/cargaVueloService.js";

export const getAllCargasVuelo = async (req, res) => {
  try {
    const cargasVuelo = await getCargasVuelo();
    res.status(200).json(cargasVuelo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addCargaVuelo = async (req, res) => {
  try {
    const newCargaVuelo = await createCargaVuelo(req.body);
    res.status(201).json(newCargaVuelo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCargaVueloById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCargaVuelo = await updateCargaVuelo(id, req.body);
    res.status(200).json(updatedCargaVuelo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCargaVueloById = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCargaVuelo(id);
    res.status(200).json({ message: "Carga de vuelo eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};