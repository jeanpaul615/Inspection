const express = require('express');
const router = express.Router();
const vehicleController = require('../../../controllers/inspection/Vehicles/vehicleController'); // Asegúrate de que la ruta es correcta

// Ruta para obtener todos los vehículos
router.get('/', vehicleController.getAllVehicles);

module.exports = router;
