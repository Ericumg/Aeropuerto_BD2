const puertaEmbarqueService = require('../services/puertaEmbarqueService');

// Obtener todas las puertas de embarque
exports.getAll = async (req, res) => {
  try {
    const puertas = await puertaEmbarqueService.getAllPuertas();
    res.json(puertas);
  } catch (err) {
    console.error("Error al obtener puertas de embarque:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Obtener puerta de embarque por ID
exports.getById = async (req, res) => {
  try {
    const puerta = await puertaEmbarqueService.getPuertaById(req.params.id);
    if (!puerta) return res.status(404).send('Puerta de embarque no encontrada');
    res.json(puerta);
  } catch (err) {
    console.error("Error al obtener puerta de embarque:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Crear puerta de embarque
exports.create = async (req, res) => {
  try {
    const data = req.body;
    await puertaEmbarqueService.createPuerta(
      data.PUE_PUERTA,
      data.PUE_NOMBRE,
      data.AER_AEROPUERTO
    );
    res.status(201).send('Puerta de embarque creada exitosamente');
  } catch (err) {
    console.error("Error al crear puerta de embarque:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Actualizar puerta de embarque
exports.update = async (req, res) => {
  try {
    const data = req.body;
    await puertaEmbarqueService.updatePuerta(
      parseInt(req.params.id),
      data.PUE_NOMBRE,
      data.AER_AEROPUERTO
    );
    res.send('Puerta de embarque actualizada correctamente');
  } catch (err) {
    console.error("Error al actualizar puerta de embarque:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Eliminar puerta de embarque
exports.remove = async (req, res) => {
  try {
    await puertaEmbarqueService.deletePuerta(req.params.id);
    res.send('Puerta de embarque eliminada correctamente');
  } catch (err) {
    console.error("Error al eliminar puerta de embarque:", err.message);
    res.status(500).json({ error: err.message });
  }
};

