const express = require("express");
const router = express.Router();
const casseteController = require("../controllers/casseteController");

router.get("/", casseteController.getAllCassetes);
router.get("/:id", casseteController.getCasseteById);
router.post("/", casseteController.createCassete);
router.put("/:id", casseteController.updateCassete);
router.delete("/:id", casseteController.deleteCassete);



module.exports = router;
