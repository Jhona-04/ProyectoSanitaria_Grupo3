const Usuario  = require("../database/models/Usuario");

const validateUserModel = async (email, password) => {
  await Usuario.build({ email_user: email, password_user: password }).validate();
};

const findUserByEmail = async (email) => {
  return await Usuario.findOne({ where: { email: email } });
};

const createUser = async (email, passwordHash) => {
  return await Usuario.create({
    email_user: email,
    password_user: passwordHash,
  });
};

const saveResetToken = async (email, token, expires) => {
    return await Usuario.update(
        { resetToken: token, resetTokenExpires: expires },
        { where: { email_user: email } }
    );
};

const findUserByResetToken = async (token) => {
    return await Usuario.findOne({ where: { resetToken: token } });
};

const updatePassword = async (userId, password) => {
    return await Usuario.update(
        { password_user: password },
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
