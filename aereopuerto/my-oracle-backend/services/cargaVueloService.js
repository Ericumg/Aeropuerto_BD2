import oracledb from "oracledb";
import { oracleConfig } from "../index.js";

export const getCargasVuelo = async () => {
  let connection;
  try {
    connection = await oracledb.getConnection(oracleConfig);
    const result = await connection.execute(
      `BEGIN PKG_CARGA_VUELO.LISTAR_CARGAS_VUELO(:cursor); END;`,
      { cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } }
    );
    const rows = await result.outBinds.cursor.getRows();
    return rows;
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
      `BEGIN PKG_CARGA_VUELO.CREAR_CARGA_VUELO(:CAR_VUELO_ID, :CAR_CARGA, :VUE_VUELO); END;`,
      {
        CAR_VUELO_ID: Number(CAR_VUELO_ID),
        CAR_CARGA: Number(CAR_CARGA),
        VUE_VUELO: Number(VUE_VUELO),
      },
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
      `BEGIN PKG_CARGA_VUELO.ACTUALIZAR_CARGA_VUELO(:CAR_VUELO_ID, :CAR_CARGA, :VUE_VUELO); END;`,
      {
        CAR_VUELO_ID: id,
        CAR_CARGA: Number(CAR_CARGA),
        VUE_VUELO: Number(VUE_VUELO),
      },
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
      `BEGIN PKG_CARGA_VUELO.BORRAR_CARGA_VUELO(:CAR_VUELO_ID); END;`,
      { CAR_VUELO_ID: id },
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