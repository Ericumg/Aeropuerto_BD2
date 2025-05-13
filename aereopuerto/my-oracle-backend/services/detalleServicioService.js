import oracledb from "oracledb";
import { oracleConfig } from "../index.js";

export const getDetallesServicio = async () => {
  let connection;
  try {
    connection = await oracledb.getConnection(oracleConfig);
    const result = await connection.execute(
      `BEGIN PKG_DETALLE_SERVICIO.LISTAR_DETALLES_SERVICIO(:cursor); END;`,
      { cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } }
    );
    const rows = await result.outBinds.cursor.getRows();
    return rows;
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
      `BEGIN PKG_DETALLE_SERVICIO.CREAR_DETALLE_SERVICIO(:DES_DETALLE_ID, :SER_SERVICIO, :PAS_PASAJERO, :VUE_VUELO, :FECHA_CONTRATACION, :MONTO); END;`,
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
      `BEGIN PKG_DETALLE_SERVICIO.ACTUALIZAR_DETALLE_SERVICIO(:DES_DETALLE_ID, :SER_SERVICIO, :PAS_PASAJERO, :VUE_VUELO, :FECHA_CONTRATACION, :MONTO); END;`,
      {
        DES_DETALLE_ID: id,
        SER_SERVICIO: Number(SER_SERVICIO),
        PAS_PASAJERO: Number(PAS_PASAJERO),
        VUE_VUELO: Number(VUE_VUELO),
        FECHA_CONTRATACION,
        MONTO,
      },
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
      `BEGIN PKG_DETALLE_SERVICIO.BORRAR_DETALLE_SERVICIO(:DES_DETALLE_ID); END;`,
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