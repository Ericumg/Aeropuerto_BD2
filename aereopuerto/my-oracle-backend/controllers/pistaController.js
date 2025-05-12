const pistaService = require('../services/pistaService');

// Obtener todas las pistas
exports.getAll = async (req, res) => {
  try {
    const pistas = await pistaService.getAllPistas();
    res.json(pistas);
  } catch (err) {
    console.error("Error al obtener pistas:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Obtener pista por ID
exports.getById = async (req, res) => {
  try {
    const pista = await pistaService.getPistaById(req.params.id);
    if (!pista) return res.status(404).send('Pista no encontrada');
    res.json(pista);
  } catch (err) {
    console.error("Error al obtener pista:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Crear nueva pista
exports.create = async (req, res) => {
  try {
    const data = req.body;
    await pistaService.createPista(
      data.PIA_PISTA,
      data.PIA_NOMBRE,
      data.PIA_AEROPUERTO
    );
    res.status(201).send('Pista creada exitosamente');
  } catch (err) {
    console.error("Error al crear pista:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Actualizar pista
exports.update = async (req, res) => {
  try {
    const data = req.body;
    await pistaService.updatePista(
      parseInt(req.params.id),
      data.PIA_NOMBRE,
      data.PIA_AEROPUERTO
    );
    res.send('Pista actualizada correctamente');
  } catch (err) {
    console.error("Error al actualizar pista:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Eliminar pista
exports.remove = async (req, res) => {
  try {
    await pistaService.deletePista(req.params.id);
    res.send('Pista eliminada correctamente');
  } catch (err) {
    console.error("Error al eliminar pista:", err.message);
    res.status(500).json({ error: err.message });
  }
};

