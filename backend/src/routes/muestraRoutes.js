const express = require("express");
const router = express.Router();
const muestraController = require("../controllers/muestraController");
const authjwt = require("../middlewares/jwt")
/**
 * @swagger
 * components:
 *   schemas:
 *     Muestra:
 *       type: object
 *       properties:
 *         idMuestra:
 *           type: integer
 *           example: 1
 *         fecha:
 *           type: string
 *           format: date-time
 *         observaciones:
 *           type: string
 *         descripcion:
 *           type: string
 *         tinicion:
 *           type: string
 *         qr_muestra:
 *           type: string
 */

router.get("/", authjwt, muestraController.getAllMuestras);
/**
 * @swagger
 * /muestras:
 *   get:
 *     summary: Listar muestras
 *     tags: [Muestras]
 *     responses:
 *       200:
 *         description: Lista de muestras
 */

router.get("/:id", authjwt, muestraController.getMuestraById);
/**
 * @swagger
 * /muestras/{id}:
 *   get:
 *     summary: Obtener muestra por ID
 *     tags: [Muestras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Muestra encontrada
 *       404:
 *         description: No encontrada
 */

router.post("/", authjwt, muestraController.createMuestra);
/**
 * @swagger
 * /muestras:
 *   post:
 *     summary: Crear muestra
 *     tags: [Muestras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Muestra'
 *     responses:
 *       201:
 *         description: Creada
 */

router.put("/:id", authjwt, muestraController.updateMuestra);
/**
 * @swagger
 * /muestras/{id}:
 *   put:
 *     summary: Actualizar muestra
 *     tags: [Muestras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Muestra'
 *     responses:
 *       200:
 *         description: Actualizada
 *       404:
 *         description: No encontrada
 */

router.delete("/:id", authjwt, muestraController.deleteMuestra);
/**
 * @swagger
 * /muestras/{id}:
 *   delete:
 *     summary: Eliminar muestra
 *     tags: [Muestras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Eliminada
 *       404:
 *         description: No encontrada
 */

module.exports = router;