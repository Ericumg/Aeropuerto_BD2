const turnoService = require('../services/turnoService');

// Obtener todos los turnos
exports.getAll = async (req, res) => {
  try {
    const turnos = await turnoService.getAllTurnos();
    res.json(turnos);
  } catch (err) {
    console.error("Error al obtener turnos:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Obtener turno por ID
exports.getById = async (req, res) => {
  try {
    const turno = await turnoService.getTurnoById(req.params.id);
    if (!turno) return res.status(404).send('Turno no encontrado');
    res.json(turno);
  } catch (err) {
    console.error("Error al obtener turno:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Crear turno
exports.create = async (req, res) => {
  try {
    const data = req.body;
    await turnoService.createTurno(data.TUR_TURNO, data.TUR_NOMBRE_TURNO);
    res.status(201).send('Turno creado exitosamente');
  } catch (err) {
    console.error("Error al crear turno:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Actualizar turno
exports.update = async (req, res) => {
  try {
    const data = req.body;
    await turnoService.updateTurno(parseInt(req.params.id), data.TUR_NOMBRE_TURNO);
    res.send('Turno actualizado correctamente');
  } catch (err) {
    console.error("Error al actualizar turno:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Eliminar turno
exports.remove = async (req, res) => {
  try {
    await turnoService.deleteTurno(req.params.id);
    res.send('Turno eliminado correctamente');
  } catch (err) {
    console.error("Error al eliminar turno:", err.message);
    res.status(500).json({ error: err.message });
  }
};

