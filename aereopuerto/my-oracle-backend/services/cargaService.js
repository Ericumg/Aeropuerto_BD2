const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

// Obtener todas las cargas
async function getAllCargas() {
  const connection = await oracledb.getConnection(dbConfig);
  const result = await connection.execute(
    `SELECT * FROM AER_CARGA`,
    [],
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await connection.close();
  return result.rows;
}

// Obtener carga por ID
async function getCargaById(id) {
  const connection = await oracledb.getConnection(dbConfig);
  const result = await connection.execute(
    `SELECT * FROM AER_CARGA WHERE CAR_CARGA = :id`,
    { id },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await connection.close();
  return result.rows[0];
}

// Crear carga
async function createCarga(CAR_CARGA, CAR_DESCRIPCION, CAR_PESO) {
  const connection = await oracledb.getConnection(dbConfig);
  await connection.execute(
    `INSERT INTO AER_CARGA (CAR_CARGA, CAR_DESCRIPCION, CAR_PESO)
     VALUES (:CAR_CARGA, :CAR_DESCRIPCION, :CAR_PESO)`,
    { CAR_CARGA, CAR_DESCRIPCION, CAR_PESO },
    { autoCommit: true }
  );
  await connection.close();
}

// Actualizar carga
async function updateCarga(CAR_CARGA, CAR_DESCRIPCION, CAR_PESO) {
  const connection = await oracledb.getConnection(dbConfig);
  await connection.execute(
    `UPDATE AER_CARGA
     SET CAR_DESCRIPCION = :CAR_DESCRIPCION,
         CAR_PESO = :CAR_PESO
     WHERE CAR_CARGA = :CAR_CARGA`,
    { CAR_CARGA, CAR_DESCRIPCION, CAR_PESO },
    { autoCommit: true }
  );
  await connection.close();
}

// Eliminar carga
async function deleteCarga(id) {
  const connection = await oracledb.getConnection(dbConfig);
  await connection.execute(
    `DELETE FROM AER_CARGA WHERE CAR_CARGA = :id`,
    { id },
    { autoCommit: true }
  );
  await connection.close();
}

module.exports = {
  getAllCargas,
  getCargaById,
  createCarga,
  updateCarga,
  deleteCarga
};

