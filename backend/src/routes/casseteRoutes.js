const express = require("express");
const router = express.Router();
const casseteController = require("../controllers/casseteController");
const authjwt = require("../middlewares/jwt")

/**
 * @swagger
 * /cassetes:
 *   get:
 *     summary: Listar todos los cassetes
 *     tags: [Cassetes]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", casseteController.getAllCassetes);

/**
 * @swagger
 * /cassetes/{id}:
 *   get:
 *     summary: Obtener un cassete
 *     tags: [Cassetes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/:id", authjwt,casseteController.getCasseteById);

/**
 * @swagger
 * /cassetes:
 *   post:
 *     summary: Crear cassete
 *     tags: [Cassetes]
 *     responses:
 *       201:
 *         description: Creado
 */
router.post("/",  casseteController.createCassete);

/**
 * @swagger
 * /cassetes/{id}:
 *   put:
 *     summary: Actualizar cassete
 *     tags: [Cassetes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 */
router.put("/:id", authjwt,casseteController.updateCassete);

/**
 * @swagger
 * /cassetes/{id}:
 *   delete:
 *     summary: Eliminar cassete
 *     tags: [Cassetes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Eliminado
 */
router.delete("/:id", authjwt,casseteController.deleteCassete);

module.exports = router;