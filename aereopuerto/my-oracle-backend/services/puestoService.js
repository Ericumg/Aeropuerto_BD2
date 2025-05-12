const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

// Obtener todos los puestos
async function getAllPuestos() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT * FROM AER_PUESTO`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows;
  } finally {
    if (connection) await connection.close();
  }
}

// Obtener puesto por ID
async function getPuestoById(id) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT * FROM AER_PUESTO WHERE PUE_PUESTO = :id`,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows[0];
  } finally {
    if (connection) await connection.close();
  }
}

// Crear nuevo puesto
async function createPuesto(PUE_PUESTO, PUE_NOMBRE_PUESTO, PUE_DESCRIPCION) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `INSERT INTO AER_PUESTO (PUE_PUESTO, PUE_NOMBRE_PUESTO, PUE_DESCRIPCION)
       VALUES (:PUE_PUESTO, :PUE_NOMBRE_PUESTO, :PUE_DESCRIPCION)`,
      {
        PUE_PUESTO,
        PUE_NOMBRE_PUESTO,
        PUE_DESCRIPCION
      },
      { autoCommit: true }
    );
  } finally {
    if (connection) await connection.close();
  }
}

// Actualizar puesto
async function updatePuesto(PUE_PUESTO, PUE_NOMBRE_PUESTO, PUE_DESCRIPCION) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `UPDATE AER_PUESTO
       SET PUE_NOMBRE_PUESTO = :PUE_NOMBRE_PUESTO,
           PUE_DESCRIPCION = :PUE_DESCRIPCION
       WHERE PUE_PUESTO = :PUE_PUESTO`,
      {
        PUE_PUESTO,
        PUE_NOMBRE_PUESTO,
        PUE_DESCRIPCION
      },
      { autoCommit: true }
    );
  } finally {
    if (connection) await connection.close();
  }
}

// Eliminar puesto
async function deletePuesto(id) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `DELETE FROM AER_PUESTO WHERE PUE_PUESTO = :id`,
      { id },
      { autoCommit: true }
    );
  } finally {
    if (connection) await connection.close();
  }
}

module.exports = {
  getAllPuestos,
  getPuestoById,
  createPuesto,
  updatePuesto,
  deletePuesto
};

