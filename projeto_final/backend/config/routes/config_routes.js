const express = require('express');
const configController = require("../controller/config_controller");
const router = express.Router();

router.post('/config', configController.setConfiguration);
router.get('/config', configController.getConfigurations);

module.exports = router;
