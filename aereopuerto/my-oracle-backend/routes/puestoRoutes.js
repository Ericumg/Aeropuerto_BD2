const express = require('express');
const router = express.Router();
const puestoController = require('../controllers/puestoController');

router.get('/', puestoController.getAll);
router.get('/:id', puestoController.getById);
router.post('/', puestoController.create);
router.put('/:id', puestoController.update);
router.delete('/:id', puestoController.remove);

module.exports = router;

