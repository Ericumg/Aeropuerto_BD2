import oracledb from "oracledb";
import { oracleConfig } from "../index.js";

export const getCargasVuelo = async () => {
  let connection;
  try {
    connection = await oracledb.getConnection(oracleConfig);
    const result = await connection.execute("SELECT CAR_VUELO_ID, CAR_CARGA, VUE_VUELO FROM AER_CARGA_VUELO");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener las cargas de vuelo:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const createCargaVuelo = async (data) => {
  const { CAR_VUELO_ID, CAR_CARGA, VUE_VUELO } = data;
  let connection;
  try {
    connection = await oracledb.getConnection(oracleConfig);
    const result = await connection.execute(
      `INSERT INTO AER_CARGA_VUELO (CAR_VUELO_ID, CAR_CARGA, VUE_VUELO) 
       VALUES (:CAR_VUELO_ID, :CAR_CARGA, :VUE_VUELO)`,
      { CAR_VUELO_ID: Number(CAR_VUELO_ID), CAR_CARGA: Number(CAR_CARGA), VUE_VUELO: Number(VUE_VUELO) },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } catch (error) {
    console.error("Error al crear la carga de vuelo:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const updateCargaVuelo = async (id, data) => {
  const { CAR_CARGA, VUE_VUELO } = data;
  let connection;
  try {
    connection = await oracledb.getConnection(oracleConfig);
    const result = await connection.execute(
      `UPDATE AER_CARGA_VUELO 
       SET CAR_CARGA = :CAR_CARGA, VUE_VUELO = :VUE_VUELO 
       WHERE CAR_VUELO_ID = :CAR_VUELO_ID`,
      { CAR_CARGA: Number(CAR_CARGA), VUE_VUELO: Number(VUE_VUELO), CAR_VUELO_ID: id },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } catch (error) {
    console.error("Error al actualizar la carga de vuelo:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const deleteCargaVuelo = async (id) => {
  let connection;
  try {
    connection = await oracledb.getConnection(oracleConfig);
    const result = await connection.execute(
      `DELETE FROM AER_CARGA_VUELO WHERE CAR_VUELO_ID = :CAR_VUELO`,
      { CAR_VUELO: id },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } catch (error) {
    console.error("Error al eliminar la carga de vuelo:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};