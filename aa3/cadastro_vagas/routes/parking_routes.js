const express = require('express');
const router = express.Router();
const parkingController = require('../controller/parking_controller');

router.post('/parking', parkingController.createParking);
router.get('/parking', parkingController.getAllParking);
router.get('/parking/:place', parkingController.getParkingByPlace);
router.patch('/parking/take/:place', parkingController.takeParkingAvailability);
router.patch('/parking/release/:place', parkingController.releaseParkingAvailability);

module.exports = router;
