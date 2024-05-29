const express = require('express');
const userController = require("../controller/user_controller");
const {validateUserInput} = require("../validations/validations");
const router = express.Router();

router.post('/user', validateUserInput, userController.createUser);
router.get('/user', userController.getAllUsers);
router.get('/user/:cpf', userController.getUserByCPF);
router.patch('/user/:cpf', validateUserInput, userController.updateUser);
router.delete('/user/:cpf', userController.deleteUser);

module.exports = router;
