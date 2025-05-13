import oracledb from "oracledb";
import { oracleConfig } from "../index.js";

export const getCheckIns = async () => {
  let connection;
  try {
    connection = await oracledb.getConnection(oracleConfig);
    const result = await connection.execute(
      `BEGIN PKG_CHECK_IN.LISTAR_CHECK_INS(:cursor); END;`,
      { cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } }
    );
    const rows = await result.outBinds.cursor.getRows();
    return rows;
  } catch (error) {
    console.error("Error al obtener los check-ins:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const createCheckIn = async (data) => {
  const { CHE_CHECK_IN, PAS_PASAJERO, VUE_VUELO, CHE_FECHA, CHE_ESTADO } = data;
  let connection;

  try {
    // Log para verificar los datos recibidos
    console.log("Datos recibidos para crear el check-in:", { CHE_CHECK_IN, PAS_PASAJERO, VUE_VUELO, CHE_FECHA, CHE_ESTADO });

    connection = await oracledb.getConnection(oracleConfig);
    const result = await connection.execute(
      `BEGIN PKG_CHECK_IN.CREAR_CHECK_IN(:CHE_CHECK_IN, :PAS_PASAJERO, :VUE_VUELO, :CHE_FECHA, :CHE_ESTADO); END;`,
      {
        CHE_CHECK_IN: Number(CHE_CHECK_IN), // Convertir a número
        PAS_PASAJERO: Number(PAS_PASAJERO), // Convertir a número
        VUE_VUELO: Number(VUE_VUELO),       // Convertir a número
        CHE_FECHA,                         // Fecha en formato 'YYYY-MM-DD'
        CHE_ESTADO, // Ajustar el tamaño del buffer
      },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } catch (error) {
    console.error("Error al crear el check-in:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const updateCheckIn = async (id, data) => {
  const { PAS_PASAJERO, VUE_VUELO, CHE_FECHA, CHE_ESTADO } = data;
  let connection;

  try {
    // Log para verificar los datos recibidos
    console.log("Datos recibidos para actualizar:", { id, PAS_PASAJERO, VUE_VUELO, CHE_FECHA, CHE_ESTADO });

    connection = await oracledb.getConnection(oracleConfig);
    const result = await connection.execute(
      `BEGIN PKG_CHECK_IN.ACTUALIZAR_CHECK_IN(:CHE_CHECK_IN, :PAS_PASAJERO, :VUE_VUELO, :CHE_FECHA, :CHE_ESTADO); END;`,
      {
        CHE_CHECK_IN: Number(id),
        PAS_PASAJERO: Number(PAS_PASAJERO),
        VUE_VUELO: Number(VUE_VUELO),
        CHE_FECHA,
        CHE_ESTADO,
      },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } catch (error) {
    console.error("Error al actualizar el check-in:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const deleteCheckIn = async (id) => {
  let connection;
  try {
    connection = await oracledb.getConnection(oracleConfig);
    const result = await connection.execute(
      `BEGIN PKG_CHECK_IN.BORRAR_CHECK_IN(:CHE_CHECK_IN); END;`,
      { CHE_CHECK_IN: id },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } catch (error) {
    console.error("Error al eliminar el check-in:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};