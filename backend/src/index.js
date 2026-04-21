const express = require("express");
const cors = require('cors');
const app = express();
const { swaggerUi, specs } = require('./swagger');
// // conexión con mysql
const sequelize = require("./database/db/db");
// // asociaciones
require("./database/db/associations");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const apiroutes = require("./routes/index");
app.use("/sanitaria", apiroutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor eschando en http://localhost:${PORT}`);
  console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
sequelize
.sync({ force: false })
.then(() => console.log("tablas sincronizadas"));
});
