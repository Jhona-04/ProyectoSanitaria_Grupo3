const Usuario = require("../models/Usuario");
const Muestra = require("../models/Muestra");
const Cassete = require("../models/Cassete");
const Imagen = require("../models/Imagen");

// Un usuario tiene muchos cassetes
Usuario.hasMany(Cassete, { foreignKey: "usuarioId" });
Cassete.belongsTo(Usuario, { foreignKey: "usuarioId" });

// Un cassete puede tener muchas muestras
Cassete.hasMany(Muestra, { foreignKey: "casseteId" });
Muestra.belongsTo(Cassete, { foreignKey: "casseteId" });

// Una muestra puede tener muchas imagenes
Muestra.hasMany(Imagen, { foreignKey: "muestraId" });
Imagen.belongsTo(Muestra, { foreignKey: "muestraId" });
