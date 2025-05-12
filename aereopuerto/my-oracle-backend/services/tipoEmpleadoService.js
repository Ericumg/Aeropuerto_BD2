const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

// Obtener todos los tipos
async function getAllTiposEmpleado() {
  const connection = await oracledb.getConnection(dbConfig);
  const result = await connection.execute(
    `SELECT * FROM AER_TIPO_EMPLEADO`,
    [],
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await connection.close();
  return result.rows;
}

// Obtener por ID
async function getTipoEmpleadoById(id) {
  const connection = await oracledb.getConnection(dbConfig);
  const result = await connection.execute(
    `SELECT * FROM AER_TIPO_EMPLEADO WHERE TIP_TIPO_EMPLEADO = :id`,
    { id },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await connection.close();
  return result.rows[0];
}

// Crear
async function createTipoEmpleado(TIP_TIPO_EMPLEADO, TIP_DESCRIPCION) {
  const connection = await oracledb.getConnection(dbConfig);
  await connection.execute(
    `INSERT INTO AER_TIPO_EMPLEADO (TIP_TIPO_EMPLEADO, TIP_DESCRIPCION)
     VALUES (:TIP_TIPO_EMPLEADO, :TIP_DESCRIPCION)`,
    { TIP_TIPO_EMPLEADO, TIP_DESCRIPCION },
    { autoCommit: true }
  );
  await connection.close();
}

// Actualizar
async function updateTipoEmpleado(TIP_TIPO_EMPLEADO, TIP_DESCRIPCION) {
  const connection = await oracledb.getConnection(dbConfig);
  await connection.execute(
    `UPDATE AER_TIPO_EMPLEADO
     SET TIP_DESCRIPCION = :TIP_DESCRIPCION
     WHERE TIP_TIPO_EMPLEADO = :TIP_TIPO_EMPLEADO`,
    { TIP_TIPO_EMPLEADO, TIP_DESCRIPCION },
    { autoCommit: true }
  );
  await connection.close();
}

// Eliminar
async function deleteTipoEmpleado(id) {
  const connection = await oracledb.getConnection(dbConfig);
  await connection.execute(
    `DELETE FROM AER_TIPO_EMPLEADO WHERE TIP_TIPO_EMPLEADO = :id`,
    { id },
    { autoCommit: true }
  );
  await connection.close();
}

module.exports = {
  getAllTiposEmpleado,
  getTipoEmpleadoById,
  createTipoEmpleado,
  updateTipoEmpleado,
  deleteTipoEmpleado
};

