const express = require('express');
const router = express.Router();
const pistaController = require('../controllers/pistaController');

router.get('/', pistaController.getAll);
router.get('/:id', pistaController.getById);
router.post('/', pistaController.create);
router.put('/:id', pistaController.update);
router.delete('/:id', pistaController.remove);

module.exports = router;

