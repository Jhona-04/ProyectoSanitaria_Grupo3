const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const muestraRoutes = require('./muestraRoutes');
const casseteRoutes = require('./casseteRoutes');

router.use('/users', userRoutes);
router.use('/muestras', muestraRoutes);
router.use('/cassetes', casseteRoutes);

module.exports = router;