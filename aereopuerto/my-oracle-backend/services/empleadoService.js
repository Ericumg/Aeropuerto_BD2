const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

// Obtener todos los empleados
async function getAllEmpleados() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT * FROM AER_EMPLEADO`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows;
  } catch (err) {
    console.error("❌ Error al obtener empleados:", err.message);
    throw err;
  } finally {
    if (connection) await connection.close();
  }
}

// Obtener un empleado por ID
async function getEmpleadoById(id) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT * FROM AER_EMPLEADO WHERE EMP_EMPLEADO = :id`,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows[0];
  } catch (err) {
    console.error("❌ Error al obtener empleado por ID:", err.message);
    throw err;
  } finally {
    if (connection) await connection.close();
  }
}

// Crear nuevo empleado
async function createEmpleado(
  EMP_EMPLEADO,
  EMP_PRIMER_NOMBRE,
  EMP_SEGUNDO_NOMBRE,
  EMP_PRIMER_APELLIDO,
  EMP_SEGUNDO_APELLIDO,
  EMP_GENERO,
  EMP_DPI,
  EMP_FECHA_NACIMIENTO,
  EMP_NIT,
  EMP_CORREO,
  EMP_TELEFONO,
  EMP_FECHA_INGRESO
) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    // Logs de depuración
    console.log("🧪 FECHAS A INSERTAR:");
    console.log("EMP_FECHA_NACIMIENTO = [" + EMP_FECHA_NACIMIENTO + "] | tipo:", typeof EMP_FECHA_NACIMIENTO);
    console.log("EMP_FECHA_INGRESO    = [" + EMP_FECHA_INGRESO + "] | tipo:", typeof EMP_FECHA_INGRESO);

    const sql = `
      INSERT INTO AER_EMPLEADO (
        EMP_EMPLEADO, EMP_PRIMER_NOMBRE, EMP_SEGUNDO_NOMBRE, EMP_PRIMER_APELLIDO,
        EMP_SEGUNDO_APELLIDO, EMP_GENERO, EMP_DPI, EMP_FECHA_NACIMIENTO,
        EMP_NIT, EMP_CORREO, EMP_TELEFONO, EMP_FECHA_INGRESO
      ) VALUES (
        :EMP_EMPLEADO, :EMP_PRIMER_NOMBRE, :EMP_SEGUNDO_NOMBRE, :EMP_PRIMER_APELLIDO,
        :EMP_SEGUNDO_APELLIDO, :EMP_GENERO, :EMP_DPI,
        TO_DATE(:EMP_FECHA_NACIMIENTO, 'YYYY-MM-DD'),
        :EMP_NIT, :EMP_CORREO, :EMP_TELEFONO,
        TO_DATE(:EMP_FECHA_INGRESO, 'YYYY-MM-DD')
      )
    `;

    const binds = {
      EMP_EMPLEADO,
      EMP_PRIMER_NOMBRE,
      EMP_SEGUNDO_NOMBRE,
      EMP_PRIMER_APELLIDO,
      EMP_SEGUNDO_APELLIDO,
      EMP_GENERO,
      EMP_DPI,
      EMP_FECHA_NACIMIENTO: String(EMP_FECHA_NACIMIENTO).slice(0, 10).trim(),
      EMP_NIT,
      EMP_CORREO,
      EMP_TELEFONO,
      EMP_FECHA_INGRESO: String(EMP_FECHA_INGRESO).slice(0, 10).trim()
    };

    await connection.execute(sql, binds, { autoCommit: true });
    console.log("✅ Empleado insertado correctamente");

  } catch (err) {
    console.error("🛑 Error al insertar:", err.message);
    throw err;
  } finally {
    if (connection) await connection.close();
  }
}

// Actualizar empleado
async function updateEmpleado(
  EMP_EMPLEADO,
  EMP_PRIMER_NOMBRE,
  EMP_SEGUNDO_NOMBRE,
  EMP_PRIMER_APELLIDO,
  EMP_SEGUNDO_APELLIDO,
  EMP_GENERO,
  EMP_DPI,
  EMP_FECHA_NACIMIENTO,
  EMP_NIT,
  EMP_CORREO,
  EMP_TELEFONO,
  EMP_FECHA_INGRESO
) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const sql = `
      UPDATE AER_EMPLEADO SET
        EMP_PRIMER_NOMBRE = :EMP_PRIMER_NOMBRE,
        EMP_SEGUNDO_NOMBRE = :EMP_SEGUNDO_NOMBRE,
        EMP_PRIMER_APELLIDO = :EMP_PRIMER_APELLIDO,
        EMP_SEGUNDO_APELLIDO = :EMP_SEGUNDO_APELLIDO,
        EMP_GENERO = :EMP_GENERO,
        EMP_DPI = :EMP_DPI,
        EMP_FECHA_NACIMIENTO = TO_DATE(:EMP_FECHA_NACIMIENTO, 'YYYY-MM-DD'),
        EMP_NIT = :EMP_NIT,
        EMP_CORREO = :EMP_CORREO,
        EMP_TELEFONO = :EMP_TELEFONO,
        EMP_FECHA_INGRESO = TO_DATE(:EMP_FECHA_INGRESO, 'YYYY-MM-DD')
      WHERE EMP_EMPLEADO = :EMP_EMPLEADO
    `;

    const binds = {
      EMP_PRIMER_NOMBRE,
      EMP_SEGUNDO_NOMBRE,
      EMP_PRIMER_APELLIDO,
      EMP_SEGUNDO_APELLIDO,
      EMP_GENERO,
      EMP_DPI,
      EMP_FECHA_NACIMIENTO: String(EMP_FECHA_NACIMIENTO).slice(0, 10).trim(),
      EMP_NIT,
      EMP_CORREO,
      EMP_TELEFONO,
      EMP_FECHA_INGRESO: String(EMP_FECHA_INGRESO).slice(0, 10).trim(),
      EMP_EMPLEADO
    };

    await connection.execute(sql, binds, { autoCommit: true });

  } catch (err) {
    console.error("❌ Error al actualizar empleado:", err.message);
    throw err;
  } finally {
    if (connection) await connection.close();
  }
}

// Eliminar empleado
async function deleteEmpleado(id) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `DELETE FROM AER_EMPLEADO WHERE EMP_EMPLEADO = :id`,
      { id },
      { autoCommit: true }
    );
  } catch (err) {
    console.error("❌ Error al eliminar empleado:", err.message);
    throw err;
  } finally {
    if (connection) await connection.close();
  }
}

module.exports = {
  getAllEmpleados,
  getEmpleadoById,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado
};

