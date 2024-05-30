const express = require('express');
const router = express.Router();
const gateController = require('../controller/gate_controller');

router.post('/gate/open', gateController.openGate);

module.exports = router;
