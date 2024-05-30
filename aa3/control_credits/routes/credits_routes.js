const express = require('express');
const creditsController = require("../controller/credits_controller");
const router = express.Router();

router.post('/credits/:cpf', creditsController.createAccount);
router.get('/credits/:cpf', creditsController.getCredits);
router.patch('/credits/:cpf/:credits', creditsController.transaction);

module.exports = router;
