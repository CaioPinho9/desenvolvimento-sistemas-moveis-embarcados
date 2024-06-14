const express = require('express');
const loggerController = require("../controller/logger_controller");
const {validateBody} = require("../validations/validations");
const router = express.Router();

router.post('/log', validateBody, loggerController.log);
router.get('/log', loggerController.getLogs);

module.exports = router;
