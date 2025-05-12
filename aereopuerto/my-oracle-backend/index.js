const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rutas existentes
const empleadoRoutes = require('./routes/empleadoRoutes');
app.use('/empleados', empleadoRoutes);

// Puesto
const puestoRoutes = require('./routes/puestoRoutes');
app.use('/puestos', puestoRoutes);

//turno
const turnoRoutes = require('./routes/turnoRoutes');
app.use('/turnos', turnoRoutes);

//tipo empleado
const tipoEmpleadoRoutes = require('./routes/tipoEmpleadoRoutes');
app.use('/tipos-empleado', tipoEmpleadoRoutes);

// pista
const pistaRoutes = require('./routes/pistaRoutes');
app.use('/pistas', pistaRoutes);


//carga
const cargaRoutes = require('./routes/cargaRoutes');
app.use('/cargas', cargaRoutes);


//puerta de embarque
const puertaEmbarqueRoutes = require('./routes/puertaEmbarqueRoutes');
app.use('/puertas-embarque', puertaEmbarqueRoutes);


// Servidor
app.listen(3001, () => {
  console.log('Servidor Node.js corriendo en puerto 3001');
});

