import oracledb from "oracledb";
import { oracleConfig } from "../index.js";

export const getCheckIns = async () => {
  let connection;
  try {
    connection = await oracledb.getConnection(oracleConfig);
    const result = await connection.execute("SELECT * FROM AER_CHECK_IN ORDER BY CHE_CHECK_IN DESC", [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    return result.rows;
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
      "INSERT INTO AER_CHECK_IN (CHE_CHECK_IN, PAS_PASAJERO, VUE_VUELO, CHE_FECHA, CHE_ESTADO) VALUES (:CHE_CHECK_IN, :PAS_PASAJERO, :VUE_VUELO, :CHE_FECHA, :CHE_ESTADO)",
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
      `UPDATE AER_CHECK_IN 
       SET PAS_PASAJERO = :PAS_PASAJERO, VUE_VUELO = :VUE_VUELO, 
           CHE_FECHA = :CHE_FECHA, CHE_ESTADO = :CHE_ESTADO 
       WHERE CHE_CHECK_IN = :CHE_CHECK_IN`,
      {
        PAS_PASAJERO: Number(PAS_PASAJERO), // Convertir a número
        VUE_VUELO: Number(VUE_VUELO),       // Convertir a número
        CHE_FECHA,                         // Fecha en formato 'YYYY-MM-DD'
        CHE_ESTADO,    // Convertir a cadena
        CHE_CHECK_IN: Number(id),          // Convertir a número
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
      "DELETE FROM AER_CHECK_IN WHERE CHE_CHECK_IN = :CHE_CHECK_IN",
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