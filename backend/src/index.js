const express = require("express");
const app = express();

// // conexión con mysql
// const sequelize = require("./database/db/db");
// // asociaciones
// require("./database/db/associations");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiroutes = require("./routes/index");
app.use("/sanitaria", apiroutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor eschando en http://localhost:${PORT}`);

//   sequelize
//     .sync({ force: false })
//     .then(() => console.log("tablas sincronizadas"));
});
