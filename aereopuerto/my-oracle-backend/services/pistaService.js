const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

// Obtener todas las pistas
async function getAllPistas() {
  const connection = await oracledb.getConnection(dbConfig);
  const result = await connection.execute(
    `SELECT * FROM AER_PISTA_ATERRIZAJE`,
    [],
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await connection.close();
  return result.rows;
}

// Obtener pista por ID
async function getPistaById(id) {
  const connection = await oracledb.getConnection(dbConfig);
  const result = await connection.execute(
    `SELECT * FROM AER_PISTA_ATERRIZAJE WHERE PIA_PISTA = :id`,
    { id },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await connection.close();
  return result.rows[0];
}

// Crear pista
async function createPista(PIA_PISTA, PIA_NOMBRE, PIA_AEROPUERTO) {
  const connection = await oracledb.getConnection(dbConfig);
  await connection.execute(
    `INSERT INTO AER_PISTA_ATERRIZAJE (PIA_PISTA, PIA_NOMBRE, PIA_AEROPUERTO)
     VALUES (:PIA_PISTA, :PIA_NOMBRE, :PIA_AEROPUERTO)`,
    { PIA_PISTA, PIA_NOMBRE, PIA_AEROPUERTO },
    { autoCommit: true }
  );
  await connection.close();
}

// Actualizar pista
async function updatePista(PIA_PISTA, PIA_NOMBRE, PIA_AEROPUERTO) {
  const connection = await oracledb.getConnection(dbConfig);
  await connection.execute(
    `UPDATE AER_PISTA_ATERRIZAJE
     SET PIA_NOMBRE = :PIA_NOMBRE,
         PIA_AEROPUERTO = :PIA_AEROPUERTO
     WHERE PIA_PISTA = :PIA_PISTA`,
    { PIA_PISTA, PIA_NOMBRE, PIA_AEROPUERTO },
    { autoCommit: true }
  );
  await connection.close();
}

// Eliminar pista
async function deletePista(id) {
  const connection = await oracledb.getConnection(dbConfig);
  await connection.execute(
    `DELETE FROM AER_PISTA_ATERRIZAJE WHERE PIA_PISTA = :id`,
    { id },
    { autoCommit: true }
  );
  await connection.close();
}

module.exports = {
  getAllPistas,
  getPistaById,
  createPista,
  updatePista,
  deletePista
};

