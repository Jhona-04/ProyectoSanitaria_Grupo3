const Cassete = require("../database/models/Cassete");

const getAllCassetes = async () => {
  return await Cassete.findAll();
};

const getCasseteById = async (id) => {
  return await Cassete.findByPk(id);
};

const createCassete = async (data) => {
  console.log("Service: createCassete in DB", data);
  return await Cassete.create(data);
};

const updateCassete = async (id, data) => {
  const cassete = await Cassete.findByPk(id);
  if (!cassete) {
    return null;
  }
  return await cassete.update(data);
};

const deleteCassete = async (id) => {
  const deleted = await Cassete.destroy({
    where: { id_cassete: id },
  });
  return deleted > 0;
};

module.exports = {
  getAllCassetes,
  getCasseteById,
  createCassete,
  updateCassete,
  deleteCassete,
};