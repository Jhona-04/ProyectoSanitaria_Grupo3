const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento de Multer para guardar en disco
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Directorio donde se guardarán las imágenes
    cb(null, 'src/uploads/'); 
  },
  filename: (req, file, cb) => {
    // Renombrar el archivo para evitar colisiones
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Filtro para aceptar solo ciertos tipos de imagen
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true); // Aceptar archivo
  }
  // Rechazar archivo
  cb(new Error("Error: El tipo de archivo no está permitido. Solo se aceptan imágenes (jpeg, jpg, png, gif)."));
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // Límite de 20MB
  fileFilter: fileFilter
});

module.exports = upload;
