import oracledb from "oracledb";
import { oracleConfig } from "../index.js";

export const getRecepciones = async () => {
  let connection;
  try {
    connection = await oracledb.getConnection(oracleConfig);
    const result = await connection.execute("SELECT * FROM AER_RECEPCION");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener las recepciones:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const createRecepcion = async (data) => {
  const { REC_RECEPCION, PAS_PASAJERO, VUE_VUELO, REC_FECHA, REC_ESTADO } = data;
  console.log("Datos recibidos para crear el check-in:", { REC_RECEPCION, PAS_PASAJERO, VUE_VUELO, REC_FECHA, REC_ESTADO });

  let connection;
  try {
    connection = await oracledb.getConnection(oracleConfig);
    const result = await connection.execute(
      "INSERT INTO AER_RECEPCION (REC_RECEPCION, PAS_PASAJERO, VUE_VUELO, REC_FECHA, REC_ESTADO) VALUES (:REC_RECEPCION, :PAS_PASAJERO, :VUE_VUELO, :REC_FECHA, :REC_ESTADO)",
      { REC_RECEPCION: Number(REC_RECEPCION), PAS_PASAJERO: Number(PAS_PASAJERO), VUE_VUELO: Number(VUE_VUELO), REC_FECHA, REC_ESTADO },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } catch (error) {
    console.error("Error al crear la recepción:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const updateRecepcion = async (id, data) => {
  const { PAS_PASAJERO, VUE_VUELO, REC_FECHA, REC_ESTADO } = data;
  let connection;
  try {
    connection = await oracledb.getConnection(oracleConfig);
    const result = await connection.execute(
      `UPDATE AER_RECEPCION 
       SET PAS_PASAJERO = :PAS_PASAJERO, VUE_VUELO = :VUE_VUELO, 
           REC_FECHA = :REC_FECHA, REC_ESTADO = :REC_ESTADO 
       WHERE REC_RECEPCION = :REC_RECEPCION`,
      { PAS_PASAJERO: Number(PAS_PASAJERO), VUE_VUELO: Number(VUE_VUELO), REC_FECHA, REC_ESTADO, REC_RECEPCION: id },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } catch (error) {
    console.error("Error al actualizar la recepción:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const deleteRecepcion = async (id) => {
  let connection;
  try {
    connection = await oracledb.getConnection(oracleConfig);
    const result = await connection.execute(
      `DELETE FROM AER_RECEPCION WHERE REC_RECEPCION = :REC_RECEPCION`,
      { REC_RECEPCION: id },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } catch (error) {
    console.error("Error al eliminar la recepción:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};