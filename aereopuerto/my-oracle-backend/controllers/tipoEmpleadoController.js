const tipoEmpleadoService = require('../services/tipoEmpleadoService');

// Obtener todos los tipos de empleado
exports.getAll = async (req, res) => {
  try {
    const tipos = await tipoEmpleadoService.getAllTiposEmpleado();
    res.json(tipos);
  } catch (err) {
    console.error("Error al obtener tipos de empleado:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Obtener tipo por ID
exports.getById = async (req, res) => {
  try {
    const tipo = await tipoEmpleadoService.getTipoEmpleadoById(req.params.id);
    if (!tipo) return res.status(404).send('Tipo de empleado no encontrado');
    res.json(tipo);
  } catch (err) {
    console.error("Error al obtener tipo:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Crear tipo
exports.create = async (req, res) => {
  try {
    const data = req.body;
    await tipoEmpleadoService.createTipoEmpleado(
      data.TIP_TIPO_EMPLEADO,
      data.TIP_DESCRIPCION
    );
    res.status(201).send('Tipo de empleado creado exitosamente');
  } catch (err) {
    console.error("Error al crear tipo:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Actualizar tipo
exports.update = async (req, res) => {
  try {
    const data = req.body;
    await tipoEmpleadoService.updateTipoEmpleado(
      parseInt(req.params.id),
      data.TIP_DESCRIPCION
    );
    res.send('Tipo de empleado actualizado correctamente');
  } catch (err) {
    console.error("Error al actualizar tipo:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Eliminar tipo
exports.remove = async (req, res) => {
  try {
    await tipoEmpleadoService.deleteTipoEmpleado(req.params.id);
    res.send('Tipo de empleado eliminado correctamente');
  } catch (err) {
    console.error("Error al eliminar tipo:", err.message);
    res.status(500).json({ error: err.message });
  }
};

