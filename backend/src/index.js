const express = require("express");
const cors = require('cors');
const app = express();
const { swaggerUi, specs } = require('./swagger');
// // conexión con mysql
const sequelize = require("./database/db/db");
// // asociaciones
require("./database/db/associations");

// Configuración de CORS más específica
const corsOptions = {
  origin: 'http://127.0.0.1:5500', // Origen de tu frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Permite cookies
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const apiroutes = require("./routes/index");
app.use("/sanitaria", apiroutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
sequelize
.sync({ force: false })
.then(() => console.log("tablas sincronizadas"));
});
