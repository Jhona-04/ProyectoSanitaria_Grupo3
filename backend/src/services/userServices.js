const Usuario  = require("../database/models/Usuario");

const validateUserModel = async (email, password, centro, rol, nombre, apellidos) => {
  await Usuario.build({ email: email, password: password, centro: centro, rol: rol, nombre: nombre, apellidos: apellidos }).validate();
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
        { where: { id_user: userId } }
    );
};

const clearResetToken = async (userId) => {
    return await Usuario.update(
        { resetToken: null, resetTokenExpires: null },
        { where: { id_user: userId } }
    );
};

module.exports = {
  validateUserModel,
  findUserByEmail,
  createUser,
  saveResetToken,
  findUserByResetToken,
  updatePassword,
  clearResetToken,
};
