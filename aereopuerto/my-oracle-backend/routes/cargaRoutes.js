const express = require('express');
const router = express.Router();
const cargaController = require('../controllers/cargaController');

router.get('/', cargaController.getAll);
router.get('/:id', cargaController.getById);
router.post('/', cargaController.create);
router.put('/:id', cargaController.update);
router.delete('/:id', cargaController.remove);

module.exports = router;


