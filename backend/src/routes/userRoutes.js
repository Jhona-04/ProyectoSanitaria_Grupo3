const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/**
 * @swagger
 * components:
 *   schemas:
 *     UserAuth:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: usuario@email.com
 *         password:
 *           type: string
 *           example: 123456
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registrar usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAuth'
 *     responses:
 *       201:
 *         description: Usuario registrado
 *       400:
 *         description: Error de validación
 */
router.post("/register", userController.register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAuth'
 *     responses:
 *       200:
 *         description: Login correcto (devuelve JWT)
 *       401:
 *         description: Credenciales incorrectas
 */
router.post("/login", userController.login);

/**
 * @swagger
 * /users/forgot-password:
 *   post:
 *     summary: Solicitar recuperación de contraseña
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *     responses:
 *       200:
 *         description: Email enviado (si existe)
 */
router.post("/forgot-password", userController.forgotPassword);

/**
 * @swagger
 * /users/reset-password/{token}:
 *   post:
 *     summary: Restablecer contraseña
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: nuevaPassword123
 *     responses:
 *       200:
 *         description: Contraseña actualizada
 *       400:
 *         description: Token inválido o expirado
 */
router.post("/reset-password/:token", userController.resetPassword);

module.exports = router;
