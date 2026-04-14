const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Registro de usuario
router.post("/register", userController.register);

// Login de usuario
router.post("/login", userController.login);

// Olvido de contraseña
router.post("/forgot-password", userController.forgotPassword);

// Restablecimiento de contraseña
router.post("/reset-password/:token", userController.resetPassword);

module.exports = router;
