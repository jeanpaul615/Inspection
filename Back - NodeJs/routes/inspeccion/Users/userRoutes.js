const express = require('express');
const router = express.Router();
const usersController = require('../../../controllers/inspection/Users/userController'); // Asegúrate de que la ruta es correcta

// Ruta para obtener todos los vehículos
router.get('/', usersController.getAllUsers);

module.exports = router;
