const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

// Obtener todas las puertas de embarque
async function getAllPuertas() {
  const connection = await oracledb.getConnection(dbConfig);
  const result = await connection.execute(
    `SELECT * FROM AER_PUERTA_EMBARQUE`,
    [],
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await connection.close();
  return result.rows;
}

// Obtener puerta de embarque por ID
async function getPuertaById(id) {
  const connection = await oracledb.getConnection(dbConfig);
  const result = await connection.execute(
    `SELECT * FROM AER_PUERTA_EMBARQUE WHERE PUE_PUERTA = :id`,
    { id },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await connection.close();
  return result.rows[0];
}

// Crear puerta de embarque
async function createPuerta(PUE_PUERTA, PUE_NOMBRE, AER_AEROPUERTO) {
  const connection = await oracledb.getConnection(dbConfig);
  await connection.execute(
    `INSERT INTO AER_PUERTA_EMBARQUE (PUE_PUERTA, PUE_NOMBRE, AER_AEROPUERTO)
     VALUES (:PUE_PUERTA, :PUE_NOMBRE, :AER_AEROPUERTO)`,
    { PUE_PUERTA, PUE_NOMBRE, AER_AEROPUERTO },
    { autoCommit: true }
  );
  await connection.close();
}

// Actualizar puerta de embarque
async function updatePuerta(PUE_PUERTA, PUE_NOMBRE, AER_AEROPUERTO) {
  const connection = await oracledb.getConnection(dbConfig);
  await connection.execute(
    `UPDATE AER_PUERTA_EMBARQUE
     SET PUE_NOMBRE = :PUE_NOMBRE,
         AER_AEROPUERTO = :AER_AEROPUERTO
     WHERE PUE_PUERTA = :PUE_PUERTA`,
    { PUE_PUERTA, PUE_NOMBRE, AER_AEROPUERTO },
    { autoCommit: true }
  );
  await connection.close();
}

// Eliminar puerta de embarque
async function deletePuerta(id) {
  const connection = await oracledb.getConnection(dbConfig);
  await connection.execute(
    `DELETE FROM AER_PUERTA_EMBARQUE WHERE PUE_PUERTA = :id`,
    { id },
    { autoCommit: true }
  );
  await connection.close();
}

module.exports = {
  getAllPuertas,
  getPuertaById,
  createPuerta,
  updatePuerta,
  deletePuerta
};

