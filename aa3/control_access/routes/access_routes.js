const express = require('express');
const accessController = require("../controller/access_controller");
const {validateInput} = require("../validations/validations");
const router = express.Router();

router.post('/access', validateInput, accessController.enterParking);
router.post('/access/exit', validateInput, accessController.exitParking);
router.get('/access', accessController.getAllAccess);

module.exports = router;
