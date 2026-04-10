const express = require('express');
const router = express.Router();

const casseteRoutes = require('./casseteRoutes');

router.use('/cassetes', casseteRoutes);

module.exports = router;
