const express = require('express');
const router = express.Router();
const tipoEmpleadoController = require('../controllers/tipoEmpleadoController');

router.get('/', tipoEmpleadoController.getAll);
router.get('/:id', tipoEmpleadoController.getById);
router.post('/', tipoEmpleadoController.create);
router.put('/:id', tipoEmpleadoController.update);
router.delete('/:id', tipoEmpleadoController.remove);

module.exports = router;

