const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Registro de usuario
router.post("/register", userController.register);

// Login de usuario
router.post("/login", userController.login);

module.exports = router;
