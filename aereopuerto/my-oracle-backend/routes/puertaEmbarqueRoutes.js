const express = require('express');
const router = express.Router();
const puertaEmbarqueController = require('../controllers/puertaEmbarqueController');

router.get('/', puertaEmbarqueController.getAll);
router.get('/:id', puertaEmbarqueController.getById);
router.post('/', puertaEmbarqueController.create);
router.put('/:id', puertaEmbarqueController.update);
router.delete('/:id', puertaEmbarqueController.remove);

module.exports = router;

