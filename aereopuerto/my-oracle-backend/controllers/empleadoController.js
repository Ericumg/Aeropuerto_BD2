console// Verifica que el archivo se carga
//console.log("✅ CARGADO: empleadoController.js");

const empleadoService = require('../services/empleadoService');

// Obtener todos los empleados
exports.getAll = async (req, res) => {
  try {
    const empleados = await empleadoService.getAllEmpleados();
    res.json(empleados);
  } catch (err) {
    console.error("Error al obtener empleados:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Obtener un empleado por ID
exports.getById = async (req, res) => {
  try {
    const empleado = await empleadoService.getEmpleadoById(req.params.id);
    if (!empleado) {
      return res.status(404).send('Empleado no encontrado');
    }
    res.json(empleado);
  } catch (err) {
    console.error("Error al obtener empleado:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo empleado
// Crear un nuevo empleado

exports.create = async (req, res) => {
  try {
    console.log("🔥 Entró al controlador empleadoController.create");

    const data = req.body;

    const nacimiento = String(data.EMP_FECHA_NACIMIENTO).slice(0, 10).trim();
    const ingreso = String(data.EMP_FECHA_INGRESO).slice(0, 10).trim();

    await empleadoService.createEmpleado(
      data.EMP_EMPLEADO,
      data.EMP_PRIMER_NOMBRE,
      data.EMP_SEGUNDO_NOMBRE,
      data.EMP_PRIMER_APELLIDO,
      data.EMP_SEGUNDO_APELLIDO,
      data.EMP_GENERO,
      data.EMP_DPI,
      nacimiento,
      data.EMP_NIT,
      data.EMP_CORREO,
      data.EMP_TELEFONO,
      ingreso
    );

    res.status(201).send('Empleado creado exitosamente');
  } catch (err) {
    console.error("❌ Error en controlador:", err.message);
    res.status(500).json({ error: err.message });
  }
};


// Actualizar un empleado
exports.update = async (req, res) => {
  try {
    const data = req.body;

    const nacimiento = String(data.EMP_FECHA_NACIMIENTO).slice(0, 10);
    const ingreso = String(data.EMP_FECHA_INGRESO).slice(0, 10);

    await empleadoService.updateEmpleado(
      parseInt(req.params.id),
      data.EMP_PRIMER_NOMBRE,
      data.EMP_SEGUNDO_NOMBRE,
      data.EMP_PRIMER_APELLIDO,
      data.EMP_SEGUNDO_APELLIDO,
      data.EMP_GENERO,
      data.EMP_DPI,
      nacimiento,
      data.EMP_NIT,
      data.EMP_CORREO,
      data.EMP_TELEFONO,
      ingreso
    );

    res.send('Empleado actualizado correctamente');
  } catch (err) {
    console.error("Error al actualizar empleado:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un empleado
exports.remove = async (req, res) => {
  try {
    await empleadoService.deleteEmpleado(req.params.id);
    res.send('Empleado eliminado correctamente');
  } catch (err) {
    console.error("Error al eliminar empleado:", err.message);
    res.status(500).json({ error: err.message });
  }
};

