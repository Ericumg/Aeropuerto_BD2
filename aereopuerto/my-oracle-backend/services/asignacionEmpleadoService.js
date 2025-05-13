import oracledb from "oracledb";
import { oracleConfig } from "../index.js";

export const getAsignaciones = async () => {
  let connection;
  try {
    connection = await oracledb.getConnection(oracleConfig);
    const result = await connection.execute("SELECT * FROM AER_ASIGNACION_EMPLEADO");
    return result.rows;
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
      `INSERT INTO AER_ASIGNACION_EMPLEADO (ASE_ASIGNACION, EMP_EMPLEADO, PUE_PUESTO, TUR_TURNO, TIP_TIPO_EMPLEADO, ASE_FECHA_ASIGNACION) 
       VALUES (:ASE_ASIGNACION, :EMP_EMPLEADO, :PUE_PUESTO, :TUR_TURNO, :TIP_TIPO_EMPLEADO, :FECHA_ASIGNACION`,
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
      `UPDATE AER_ASIGNACION_EMPLEADO 
       SET EMP_EMPLEADO = :EMP_EMPLEADO, PUE_PUESTO = :PUE_PUESTO, TUR_TURNO = :TUR_TURNO, 
           TIP_TIPO_EMPLEADO = :TIP_TIPO_EMPLEADO, FECHA_ASIGNACION = :FECHA_ASIGNACION 
       WHERE ASE_ASIGNACION = :ASE_ASIGNACION`,
      { EMP_EMPLEADO: Number(EMP_EMPLEADO), PUE_PUESTO: Number(PUE_PUESTO), TUR_TURNO: Number(TUR_TURNO), TIP_TIPO_EMPLEADO: Number(TIP_TIPO_EMPLEADO), FECHA_ASIGNACION, ASE_ASIGNACION: id },
      { autoCommit: true }
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
      `DELETE FROM AER_ASIGNACION_EMPLEADO WHERE ASE_ASIGNACION = :ASE_ASIGNACION`,
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

