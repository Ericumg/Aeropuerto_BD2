import oracledb from "oracledb";
import { oracleConfig } from "../index.js";

export const getAsignaciones = async () => {
  let connection;
  try {
    connection = await oracledb.getConnection(oracleConfig);
    const result = await connection.execute(
      `BEGIN PKG_ASIGNACION_EMPLEADO.LISTAR_ASIGNACIONES(:cursor); END;`,
      { cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } }
    );
    const rows = await result.outBinds.cursor.getRows();
    return rows;
  } catch (error) {
    console.error("Error al obtener las asignaciones:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const createAsignacion = async (data) => {
  const { ASE_ASIGNACION, EMP_EMPLEADO, PUE_PUESTO, TUR_TURNO, TIP_TIPO_EMPLEADO, FECHA_ASIGNACION } = data;
  let connection;
  try {
    connection = await oracledb.getConnection(oracleConfig);
    const result = await connection.execute(
      `BEGIN PKG_ASIGNACION_EMPLEADO.CREAR_ASIGNACION(:ASE_ASIGNACION, :EMP_EMPLEADO, :PUE_PUESTO, :TUR_TURNO, :TIP_TIPO_EMPLEADO, :FECHA_ASIGNACION); END;`,
      { ASE_ASIGNACION: Number(ASE_ASIGNACION), EMP_EMPLEADO: Number(EMP_EMPLEADO), PUE_PUESTO: Number(PUE_PUESTO), TUR_TURNO: Number(TUR_TURNO), TIP_TIPO_EMPLEADO: Number(TIP_TIPO_EMPLEADO), FECHA_ASIGNACION },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } catch (error) {
    console.error("Error al crear la asignación:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const updateAsignacion = async (id, data) => {
  const { EMP_EMPLEADO, PUE_PUESTO, TUR_TURNO, TIP_TIPO_EMPLEADO, FECHA_ASIGNACION } = data;
  let connection;
  try {
    connection = await oracledb.getConnection(oracleConfig);
    const result = await connection.execute(
      `BEGIN PKG_ASIGNACION_EMPLEADO.ACTUALIZAR_ASIGNACION(:ASE_ASIGNACION, :EMP_EMPLEADO, :PUE_PUESTO, :TUR_TURNO, :TIP_TIPO_EMPLEADO, :FECHA_ASIGNACION); END;`,
      {
        ASE_ASIGNACION: id,
        EMP_EMPLEADO: Number(EMP_EMPLEADO),
        PUE_PUESTO: Number(PUE_PUESTO),
        TUR_TURNO: Number(TUR_TURNO),
        TIP_TIPO_EMPLEADO: Number(TIP_TIPO_EMPLEADO),
        FECHA_ASIGNACION,
      }
    );
    return result.rowsAffected;
  } catch (error) {
    console.error("Error al actualizar la asignación:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const deleteAsignacion = async (id) => {
  let connection;
  try {
    connection = await oracledb.getConnection(oracleConfig);
    const result = await connection.execute(
      `BEGIN PKG_ASIGNACION_EMPLEADO.BORRAR_ASIGNACION(:ASE_ASIGNACION); END;`,
      { ASE_ASIGNACION: id },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } catch (error) {
    console.error("Error al eliminar la asignación:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

