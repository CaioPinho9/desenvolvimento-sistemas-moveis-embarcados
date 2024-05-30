const express = require('express');
const userController = require("../controller/user_controller");
const {validateInput} = require("../validations/validations");
const router = express.Router();

router.post('/user', validateInput, userController.createUser);
router.get('/user', userController.getAllUsers);
router.get('/user/:cpf', userController.getUserByCPF);
router.patch('/user/:cpf', validateInput, userController.updateUser);
router.delete('/user/:cpf', userController.deleteUser);

module.exports = router;
