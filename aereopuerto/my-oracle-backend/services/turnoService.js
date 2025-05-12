const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

// Obtener todos los turnos
async function getAllTurnos() {
  const connection = await oracledb.getConnection(dbConfig);
  const result = await connection.execute(
    `SELECT * FROM AER_TURNO`,
    [],
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await connection.close();
  return result.rows;
}

// Obtener turno por ID
async function getTurnoById(id) {
  const connection = await oracledb.getConnection(dbConfig);
  const result = await connection.execute(
    `SELECT * FROM AER_TURNO WHERE TUR_TURNO = :id`,
    { id },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await connection.close();
  return result.rows[0];
}

// Crear turno
async function createTurno(TUR_TURNO, TUR_NOMBRE_TURNO) {
  const connection = await oracledb.getConnection(dbConfig);
  await connection.execute(
    `INSERT INTO AER_TURNO (TUR_TURNO, TUR_NOMBRE_TURNO)
     VALUES (:TUR_TURNO, :TUR_NOMBRE_TURNO)`,
    { TUR_TURNO, TUR_NOMBRE_TURNO },
    { autoCommit: true }
  );
  await connection.close();
}

// Actualizar turno
async function updateTurno(TUR_TURNO, TUR_NOMBRE_TURNO) {
  const connection = await oracledb.getConnection(dbConfig);
  await connection.execute(
    `UPDATE AER_TURNO
     SET TUR_NOMBRE_TURNO = :TUR_NOMBRE_TURNO
     WHERE TUR_TURNO = :TUR_TURNO`,
    { TUR_TURNO, TUR_NOMBRE_TURNO },
    { autoCommit: true }
  );
  await connection.close();
}

// Eliminar turno
async function deleteTurno(id) {
  const connection = await oracledb.getConnection(dbConfig);
  await connection.execute(
    `DELETE FROM AER_TURNO WHERE TUR_TURNO = :id`,
    { id },
    { autoCommit: true }
  );
  await connection.close();
}

module.exports = {
  getAllTurnos,
  getTurnoById,
  createTurno,
  updateTurno,
  deleteTurno
};

