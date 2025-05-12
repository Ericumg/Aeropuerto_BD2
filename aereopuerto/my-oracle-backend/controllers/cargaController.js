const cargaService = require('../services/cargaService');

// Obtener todas las cargas
exports.getAll = async (req, res) => {
  try {
    const cargas = await cargaService.getAllCargas();
    res.json(cargas);
  } catch (err) {
    console.error("Error al obtener cargas:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Obtener carga por ID
exports.getById = async (req, res) => {
  try {
    const carga = await cargaService.getCargaById(req.params.id);
    if (!carga) return res.status(404).send('Carga no encontrada');
    res.json(carga);
  } catch (err) {
    console.error("Error al obtener carga:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Crear carga
exports.create = async (req, res) => {
  try {
    const data = req.body;
    await cargaService.createCarga(data.CAR_CARGA, data.CAR_DESCRIPCION, data.CAR_PESO);
    res.status(201).send('Carga creada exitosamente');
  } catch (err) {
    console.error("Error al crear carga:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Actualizar carga
exports.update = async (req, res) => {
  try {
    const data = req.body;
    await cargaService.updateCarga(parseInt(req.params.id), data.CAR_DESCRIPCION, data.CAR_PESO);
    res.send('Carga actualizada correctamente');
  } catch (err) {
    console.error("Error al actualizar carga:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Eliminar carga
exports.remove = async (req, res) => {
  try {
    await cargaService.deleteCarga(req.params.id);
    res.send('Carga eliminada correctamente');
  } catch (err) {
    console.error("Error al eliminar carga:", err.message);
    res.status(500).json({ error: err.message });
  }
};

