const express = require('express');
const router = express.Router();
const maintenanceController = require('./MaintenanceController'); 

// Ruta para obtener todos los vehículos
router.get('/', maintenanceController.getAllMaintenance);
router.get('/bylicense', maintenanceController.getMaintenanceByLicense);
router.post('/createmaintenance', maintenanceController.CreateMaintenance);
router.put('/updatemaintenance', maintenanceController.UpdateMaintenance);





module.exports = router;
