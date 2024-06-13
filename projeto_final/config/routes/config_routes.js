const express = require('express');
const configController = require("../controller/config_controller");
const router = express.Router();

router.post('/config/light', configController.setLightSensitivity);
router.post('/config/colors', configController.setColors);
router.get('/config', configController.getConfigurations);

module.exports = router;
