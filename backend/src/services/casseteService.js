// Simulación de base de datos en memoria
let cassetes = [
  { id: 1, nombre: "Cassete 1", marca: "Sony" },
  { id: 2, nombre: "Cassete 2", marca: "TDK" },
];

const getAllCassetes = async () => {
  console.log("Service: getAllCassetes");
  return cassetes;
};

const getCasseteById = async (id) => {
  console.log("Service: getCasseteById", id);
  return cassetes.find(c => c.id == id);
};

const createCassete = async (data) => {
  console.log("Service: createCassete", data);

  const newCassete = {
    id: cassetes.length + 1,
    ...data,
  };

  cassetes.push(newCassete);
  return newCassete;
};


const updateCassete = async (id, data) => {
  console.log("Service: updateCassete", id, data);

  const index = cassetes.findIndex(c => c.id == id);

  if (index === -1) return null;

  cassetes[index] = { ...cassetes[index], ...data };
  return cassetes[index];
};

const deleteCassete = async (id) => {
  console.log("Service: deleteCassete", id);

  const index = cassetes.findIndex(c => c.id == id);

  if (index === -1) return false;

  cassetes.splice(index, 1);
  return true;
};

module.exports = {
  getAllCassetes,
  getCasseteById,
  createCassete,
  updateCassete,
  deleteCassete,
};