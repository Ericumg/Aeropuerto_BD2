const puestoService = require('../services/puestoService');

// Obtener todos los puestos
exports.getAll = async (req, res) => {
  try {
    const puestos = await puestoService.getAllPuestos();
    res.json(puestos);
  } catch (err) {
    console.error("Error al obtener puestos:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Obtener puesto por ID
exports.getById = async (req, res) => {
  try {
    const puesto = await puestoService.getPuestoById(req.params.id);
    if (!puesto) {
      return res.status(404).send('Puesto no encontrado');
    }
    res.json(puesto);
  } catch (err) {
    console.error("Error al obtener puesto:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Crear nuevo puesto
exports.create = async (req, res) => {
  try {
    const data = req.body;

    await puestoService.createPuesto(
      data.PUE_PUESTO,
      data.PUE_NOMBRE_PUESTO,
      data.PUE_DESCRIPCION
    );

    res.status(201).send('Puesto creado exitosamente');
  } catch (err) {
    console.error("Error al crear puesto:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Actualizar puesto
exports.update = async (req, res) => {
  try {
    const data = req.body;

    await puestoService.updatePuesto(
      parseInt(req.params.id),
      data.PUE_NOMBRE_PUESTO,
      data.PUE_DESCRIPCION
    );

    res.send('Puesto actualizado correctamente');
  } catch (err) {
    console.error("Error al actualizar puesto:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Eliminar puesto
exports.remove = async (req, res) => {
  try {
    await puestoService.deletePuesto(req.params.id);
    res.send('Puesto eliminado correctamente');
  } catch (err) {
    console.error("Error al eliminar puesto:", err.message);
    res.status(500).json({ error: err.message });
  }
};

