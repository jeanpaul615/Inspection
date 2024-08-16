const express = require('express');
const router = express.Router();
const variablesController = require('./variableController');

// Ruta para obtener todos los indicadores
router.get('/', variablesController.getAllVariables);
router.get('/variablesbyid', variablesController.getVariablesById);



module.exports = router;
