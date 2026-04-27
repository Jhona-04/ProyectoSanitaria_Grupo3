const Usuario  = require("../database/models/Usuario");


// Validación para registro (todos los campos)
const validateUserModel = async (email, password, centro, rol, nombre, apellidos) => {
  await Usuario.build({ email, password, centro, rol, nombre, apellidos }).validate();
};

// Validación para login (solo email y password)
const validateLoginModel = async (email, password) => {
  await Usuario.build({ email, password }).validate({ fields: ['email', 'password'] });
};

const findUserByEmail = async (email) => {
  return await Usuario.findOne({ where: { email: email } });
};

const createUser = async (email, passwordHash, centro, rol, nombre, apellidos) => {
  return await Usuario.create({
    email: email,
    password: passwordHash,
    rol: rol,
    centro: centro,
    nombre: nombre,
    apellidos: apellidos
  });
};

const saveResetToken = async (email, token, expires) => {
    return await Usuario.update(
        { resetToken: token, resetTokenExpires: expires },
        { where: { email: email } }
    );
};

const findUserByResetToken = async (token) => {
    return await Usuario.findOne({ where: { resetToken: token } });
};

const updatePassword = async (userId, password) => {
    return await Usuario.update(
      { password: password },
      { where: { idUsuario: userId } }
    );
};

  const clearResetToken = async (userId) => {
    return await Usuario.update(
      { resetToken: null, resetTokenExpires: null },
      { where: { idUsuario: userId } }
    );
  };

module.exports = {
  validateUserModel,
  validateLoginModel,
  findUserByEmail,
  createUser,
  saveResetToken,
  findUserByResetToken,
  updatePassword,
  clearResetToken,
};
