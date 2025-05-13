import oracledb from "oracledb";
import { oracleConfig } from "../index.js";

export const getDetallesServicio = async () => {
  let connection;
  try {
    connection = await oracledb.getConnection(oracleConfig);
    const result = await connection.execute("SELECT DES_DETALLE_ID, SER_SERVICIO, PAS_PASAJERO, VUE_VUELO, FECHA_CONTRATACION, MONTO FROM AER_DETALLE_SERVICIO");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener los detalles de servicio:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const createDetalleServicio = async (data) => {
  const { DES_DETALLE_ID, SER_SERVICIO, PAS_PASAJERO, VUE_VUELO, FECHA_CONTRATACION, MONTO } = data;
  let connection;
  try {
    connection = await oracledb.getConnection(oracleConfig);
    const result = await connection.execute(
      `INSERT INTO AER_DETALLE_SERVICIO (DES_DETALLE_ID, SER_SERVICIO, PAS_PASAJERO, VUE_VUELO, FECHA_CONTRATACION, MONTO) 
       VALUES (:DES_DETALLE_ID, :SER_SERVICIO, :PAS_PASAJERO, :VUE_VUELO, :FECHA_CONTRATACION, :MONTO)`,
      { DES_DETALLE_ID: Number(DES_DETALLE_ID), SER_SERVICIO: Number(SER_SERVICIO), PAS_PASAJERO: Number(PAS_PASAJERO), VUE_VUELO: Number(VUE_VUELO), FECHA_CONTRATACION, MONTO },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } catch (error) {
    console.error("Error al crear el detalle de servicio:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const updateDetalleServicio = async (id, data) => {
  const { SER_SERVICIO, PAS_PASAJERO, VUE_VUELO, FECHA_CONTRATACION, MONTO } = data;
  let connection;
  try {
    connection = await oracledb.getConnection(oracleConfig);
    const result = await connection.execute(
      `UPDATE AER_DETALLE_SERVICIO 
       SET SER_SERVICIO = :SER_SERVICIO, PAS_PASAJERO = :PAS_PASAJERO, VUE_VUELO = :VUE_VUELO, 
           FECHA_CONTRATACION = :FECHA_CONTRATACION, MONTO = :MONTO 
       WHERE DES_DETALLE_ID = :DES_DETALLE_ID`,
      { SER_SERVICIO: Number(SER_SERVICIO), PAS_PASAJERO: Number(PAS_PASAJERO), VUE_VUELO: Number(VUE_VUELO), FECHA_CONTRATACION, MONTO, DES_DETALLE_ID: id },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } catch (error) {
    console.error("Error al actualizar el detalle de servicio:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const deleteDetalleServicio = async (id) => {
  let connection;
  try {
    connection = await oracledb.getConnection(oracleConfig);
    const result = await connection.execute(
      `DELETE FROM AER_DETALLE_SERVICIO WHERE DES_DETALLE_ID = :DES_DETALLE_ID`,
      { DES_DETALLE_ID: id },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } catch (error) {
    console.error("Error al eliminar el detalle de servicio:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};