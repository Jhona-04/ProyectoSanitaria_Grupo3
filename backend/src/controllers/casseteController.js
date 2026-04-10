
const casseteService = require('../services/casseteService');


const getAllCassetes = async (req, res) => {
  try {
    const cassetes = await casseteService.getAllCassetes();
    res.status(200).json(cassetes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getCasseteById = async (req, res) => {
  try {
    const cassete = await casseteService.getCasseteById(req.params.id);
    if (cassete) {
      res.status(200).json(cassete);
    } else {
      res.status(404).json({ message: "Cassete no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createCassete = async (req, res) => {
  try {
    const createdCassete = await casseteService.createCassete(req.body);
    res.status(201).json(createdCassete);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCassete = async (req, res) => {
  try {
    const updatedCassete = await casseteService.updateCassete(
      req.params.id,
      req.body
    );
    if (updatedCassete) {
      res.status(200).json(updatedCassete);
    } else {
      res.status(404).json({ message: "Cassete no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteCassete = async (req, res) => {
  try {
    const deleted = await casseteService.deleteCassete(req.params.id);
    if (deleted) {
      res.status(204).json({ message: "Cassete  eliminado" });
    } else {
      res.status(404).json({ message: "Cassete no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getAllCassetes,
    getCasseteById, 
    createCassete, 
    updateCassete,
    deleteCassete
};